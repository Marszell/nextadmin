import {deleteGameAndProduct, fetchGame, fetchGameByName, update} from "@/app/lib/gameRepository";
import {NextResponse} from "next/server";
import fs from 'fs'
import path from "path";
import prisma from '@/app/lib/prisma';

export async function DELETE(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const game = await fetchGame(id);
        await fs.unlink(path.join(process.cwd(), "./public/" + game.image_url), function(error) {});
        // await prisma.$transaction([
        //     await deleteGame(id),
        //     await deleteProductByGame(id)
        // ]);
        await deleteGameAndProduct(id);
        
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch(err) {
        console.log(err)
    }
}

export async function GET(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const game = await fetchGame(id)
        return NextResponse.json({ message: "", data: game, error: {} }, { status: 200 });
    } catch(err) {
        console.log(err)
    }
}

export async function PUT(req : Request, { params }) : Promise<NextResponse> {
    const id = parseInt(params.id)

    try {
        const formData = await req.formData()
        const file = formData.get("file")

        const gameName = formData.get("name").toString();
        const gameById = await fetchGame(id);
        const gameByName = await fetchGameByName(gameName);
        if (gameByName !== null && parseInt(gameByName.id) !== id) {
            return NextResponse.json(
                {
                    message: "Duplicate game name",
                    data: {},
                    error: {},
                },
                { status: 400 })
        }
        let fileName = gameById.image_url;
        if (file !== "undefined" && fileName !== null) {
            const buffer = Buffer.from(await file.arrayBuffer())
            fileName = "/uploads/" + Date.now() + file.name.replaceAll(" ", "_");

            await fs.writeFile(
                path.join(process.cwd(), "./public/" + fileName),
                buffer
            );

            await unlink(path.join(process.cwd(), "./public/" + gameById.image_url));
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