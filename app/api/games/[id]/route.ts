import {deleteGameAndProduct, fetchGame, fetchGameByName, update} from "@/app/lib/GameRepository";
import {NextResponse} from "next/server";
import fs from 'fs'
import path from "path";
import {GameFormSchema} from "@/app/lib/Validations";

export async function DELETE(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const game = await fetchGame(id);
        await fs.unlink(path.join(process.cwd(), "./public/" + game.image_url), function(error) {});
        await deleteGameAndProduct(id);
        
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}

export async function GET(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const game = await fetchGame(id)
        return NextResponse.json({ message: "", data: game, error: {} }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}

const UpdateGame = GameFormSchema.omit({file: true})
export async function PUT(req : Request, { params }) : Promise<NextResponse> {
    try {
        const formData = await req.formData()

        const validatedFormData = UpdateGame.safeParse({
            id: parseInt(params['id']),
            name: formData.get("name"),
        })

        if (!validatedFormData.success) {
            return NextResponse.json({
                message: "Update Game failed",
                data: {},
                error: validatedFormData.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const id = parseInt(params.id)
        const file = formData.get("file")
        const gameById = await fetchGame(id);
        let fileName = gameById.image_url;
        if (file !== "undefined" && fileName !== null) {
            const buffer = Buffer.from(await file.arrayBuffer())
            fileName = "/uploads/" + Date.now() + file.name.replaceAll(" ", "_");

            await fs.writeFile(
                path.join(process.cwd(), "./public/" + fileName),
                buffer
            );

            await fs.unlink(path.join(process.cwd(), "./public/" + gameById.image_url), function(error) {});
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
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}