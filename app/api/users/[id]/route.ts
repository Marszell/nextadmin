import {deleteUser, fetchUser, fetchUserByName, update} from "@/app/lib/userRepository";
import {NextResponse} from "next/server";
import {unlink, writeFile} from "fs/promises";
import path from "path";

export async function DELETE(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const user = await fetchUser(id);
        await unlink(path.join(process.cwd(), "./public/" + user.image_url));
        await deleteUser(id)
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch(err) {
        console.log(err)
    }
}

export async function GET(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const user = await fetchUser(id)
        return NextResponse.json({ message: "", data: user, error: {} }, { status: 200 });
    } catch(err) {
        console.log(err)
    }
}

export async function PUT(req : Request, { params }) : Promise<NextResponse> {
    const id = parseInt(params.id)

    try {
        const formData = await req.formData()
        const file = formData.get("file")

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
            form[pair[0]] = pair[1]
        }
        await update(id, {
            ...form,
            image_url: fileName,
        })
        return NextResponse.json({ message: "Success", data: {}, errors: {} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "", data: {}, error: error, status: 500 })
    }
}