import {deleteUser, fetchUser, fetchUserByName, update} from "@/app/lib/UserRepository";
import {NextResponse} from "next/server";
import {unlink, writeFile} from "fs/promises";
import path from "path";
import {UserFormSchema} from "@/app/lib/Validations";
import bcrypt from "bcryptjs";

export async function DELETE(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const user = await fetchUser(id);
        await unlink(path.join(process.cwd(), "./public/" + user.image_url));
        await deleteUser(id)
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}

export async function GET(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const user = await fetchUser(id)
        return NextResponse.json({ message: "", data: user, error: {} }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}

const UpdateUser = UserFormSchema.omit({file: true})
export async function PUT(req : Request, { params }) : Promise<NextResponse> {
    try {
        const formData = await req.formData()
        const validatedFormData = UpdateUser.safeParse({
            id: parseInt(params['id']),
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            file: formData.get("file"),
        })

        if (!validatedFormData.success) {
            return NextResponse.json({
                message: "Update User failed",
                data: {},
                error: validatedFormData.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const file = formData.get("file")
        const id = parseInt(params.id)
        const userName = formData.get("name").toString();
        const userById = await fetchUser(id);
        const userByName = await fetchUserByName(userName);
        if (userByName !== null && parseInt(userByName.id) !== id) {
            return NextResponse.json(
                {
                    message: "Duplicate user name",
                    data: {},
                    error: {},
                },
                { status: 400 })
        }
        let fileName = userById.image_url;
        if (file !== "undefined" && fileName !== null) {
            const buffer = Buffer.from(await file.arrayBuffer())
            fileName = "/uploads/" + Date.now() + file.name.replaceAll(" ", "_");

            await writeFile(
                path.join(process.cwd(), "./public/" + fileName),
                buffer
            );

            await unlink(path.join(process.cwd(), "./public/" + userById.image_url));
        }
        const form = {}
        for (const pair of formData.entries()) {
            if(pair[0] == "file") continue
            if (pair[0] === "password") {
                form[pair[0]] = bcrypt.hashSync(pair[1], 10);
            } else {
                form[pair[0]] = pair[1]
            }
        }
        await update(id, {
            ...form,
            image_url: fileName,
        })
        return NextResponse.json({ message: "Success", data: {}, errors: {} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}