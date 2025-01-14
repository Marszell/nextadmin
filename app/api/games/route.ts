import {NextResponse} from 'next/server';
import {create, fetchGamesV2, isExistsByName} from "@/app/lib/GameRepository";
import {writeFile} from "fs/promises";
import path from "path";
import {GameFormSchema} from "@/app/lib/Validations";

BigInt.prototype.toJSON = function() { return this.toString() }

export async function GET(request: Request): Promise<any> {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const gameParam = searchParams.get("name");
        const games = await fetchGamesV2(gameParam ?? "")
        return NextResponse.json({ message: "", data: games, error: {} }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 });
    }
}

const CreateGame = GameFormSchema.omit({id: true})
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData()

        const validatedFormData = CreateGame.safeParse({
            name: formData.get("name"),
            file: formData.get("file"),
        })

        if (!validatedFormData.success) {
            return NextResponse.json({
                    message: "Create Game failed",
                    data: {},
                    error: validatedFormData.error.flatten().fieldErrors
                }, { status: 400 });
        }

        const file = formData.get("file")
        if (!file) {
            return NextResponse.json({ error: "No files received." }, { status: 400 })
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
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}