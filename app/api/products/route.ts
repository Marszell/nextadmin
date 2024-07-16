import {NextResponse} from 'next/server';
import {create, fetchProductsV2, isExistsByName} from "@/app/lib/productRepository";
import {writeFile} from "fs/promises";
import path from "path";

BigInt.prototype.toJSON = function() { return this.toString() }

export async function GET(request: Request): Promise<any> {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const productParam = searchParams.get("name");
        const products = await fetchProductsV2(productParam ?? "")
        // if (!productParam) {
        //     products = await fetchProducts();
        // } else {
        //     products = await fetchProductsV2(productParam);
        // }
        return NextResponse.json({ message: "", data: products, error: {} }, { status: 200 })
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

        const productName = formData.get("name").toString();
        const isExists = await isExistsByName(productName);
        if (isExists) {
            return NextResponse.json(
                {
                    message: "Duplicate product name",
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
            if (pair[0] === "price" || pair[0] === "game_id" || pair[0] === "quantity")form[pair[0]] = parseInt(pair[1])
            else form[pair[0]] = pair[1]
        }

        // const tezt = {
        //     "name": "qwe",
        //     "image_url": "test",
        //     "description": "q",
        //     "game_id": 23,
        //     "price": 123,
        //     "quantity": 123,
        // }
        // await create({
        //     ...tezt
        // })

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