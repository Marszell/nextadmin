import {deleteProduct, fetchProduct, fetchProductByName, update} from "@/app/lib/productRepository";
import {NextResponse} from "next/server";
import {unlink, writeFile} from "fs/promises";
import path from "path";

export async function DELETE(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const product = await fetchProduct(id);
        await unlink(path.join(process.cwd(), "./public/" + product.image_url));
        await deleteProduct(id)
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch(err) {
        console.log(err)
    }
}

export async function GET(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const product = await fetchProduct(id)
        return NextResponse.json({ message: "", data: product, error: {} }, { status: 200 });
    } catch(err) {
        console.log(err)
    }
}

export async function PUT(req : Request, { params }) : Promise<NextResponse> {
    const id = parseInt(params.id)

    try {
        const formData = await req.formData()
        const file = formData.get("file")

        const productName = formData.get("name").toString();
        const productById = await fetchProduct(id);
        const productByName = await fetchProductByName(productName);
        if (productByName !== null && parseInt(productByName.id) !== id ) {
            return NextResponse.json(
                {
                    message: "Duplicate Product Name",
                    data: {},
                    error: {},
                },
                {status: 400})
        }
        let fileName = productById.image_url;
        if (file !== "undefined" && fileName !== null) {
            const buffer = Buffer.from(await file.arrayBuffer())
            fileName = "/uploads/" + Date.now() + file.name.replaceAll(" ","_");

            await writeFile(
                path.join(process.cwd(), "./public/" + fileName),
                buffer
            );

            await unlink(path.join(process.cwd(), "./public/" + productById.image_url));
        }
        const form = {}
        for (const pair of formData.entries()){
            if(pair[0] =="file") continue
            if (pair[0] === "price" || pair[0] ==="game_id" || pair[0] ==="quantity")form[pair[0]] = parseInt(pair[1])
            else form[pair[0]] = pair[1]
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