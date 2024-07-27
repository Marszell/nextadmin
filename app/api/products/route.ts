import {NextResponse} from 'next/server';
import {create, fetchProductsV2, isExistsByName} from "@/app/lib/ProductRepository";
import {writeFile} from "fs/promises";
import path from "path";
import {GameFormSchema, ProductFormSchema} from "@/app/lib/Validations";
import {isNumber} from "@/app/lib/Utils";

BigInt.prototype.toJSON = function() { return this.toString() }

export async function GET(request: Request): Promise<any> {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const gameOrProductName = searchParams.get("name");
        const gameId = searchParams.get("game_id") !== null ? Number(BigInt(searchParams.get("game_id"))) : null;
        const products = await fetchProductsV2(gameOrProductName ?? "", gameId)
        return NextResponse.json({ message: "", data: products, error: {} }, { status: 200 })
    } catch(error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}

const CreateProduct = ProductFormSchema.omit({id: true})
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData()

        const validatedFormData = CreateProduct.safeParse({
            name: formData.get("name"),
            game_id: isNumber(formData.get("game_id")) ? Number(formData.get("game_id")) : formData.get("game_id"),
            price: isNumber(formData.get("price")) ? Number(formData.get("price")) : formData.get("price"),
            quantity: isNumber(formData.get("quantity")) ? Number(formData.get("quantity")) : formData.get("quantity"),
            file: formData.get("file"),
        })

        if (!validatedFormData.success) {
            return NextResponse.json({
                message: "Create Product failed",
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
        const form = {}
        for (const pair of formData.entries()) {
            if(pair[0] == "file") continue
            if (pair[0] === "price" || pair[0] === "game_id" || pair[0] === "quantity")form[pair[0]] = parseInt(pair[1])
            else form[pair[0]] = pair[1]
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