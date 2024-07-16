import {NextResponse} from 'next/server';
import {create, fetchUsers, fetchUsersV2, isExistsByName, fetchUserByEmail} from "@/app/lib/userRepository";
import {writeFile} from "fs/promises";
import path from "path";

BigInt.prototype.toJSON = function() { return this.toString() }

export async function GET(request: Request): Promise<any> {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const userParam = searchParams.get("name");
        // const users = await fetchUsersV2(userParam ?? "")
        const users = await fetchUsersV2(userParam ?? "")
        return NextResponse.json({ message: "", data: users, error: {} }, { status: 200 })
    } catch(err) {
        console.log(err)
    }
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData()
        const file = formData.get("file")
        if (!file) {
            return NextResponse.json({ error: "No files received." }, { status: 400 })
        }

        const userName = formData.get("name").toString();
        const isExists = await isExistsByName(userName);
        if (isExists) {
            return NextResponse.json(
                {
                    message: "Duplicate user name",
                    data: {},
                    error: {},
                },
                { status: 400 }
            )
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = "/uploads/" + Date.now() + file.name.replaceAll(" ", "_");
        // const filename = Date.now() + formData.get("name")
        // const form = Object.fromEntries(formData.entries())
        const form = {}
        for (const pair of formData.entries()) {
            if(pair[0] == "file") continue
            form[pair[0]] = pair[1]
        }

        await create({
            ...form,
            image_url: fileName,
        })
        await writeFile(
            path.join(process.cwd(), "./public/" + fileName),
            buffer
        );
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "", data: {}, error: error, status: 500 })
    }
}