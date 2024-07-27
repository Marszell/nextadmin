import {ProductFormSchema, TransactionFormSchema} from "@/app/lib/Validations";
import {NextResponse} from "next/server";
import {isNumber} from "@/app/lib/Utils";
import {writeFile} from "fs/promises";
import path from "path";
import {create, fetchOrders, fetchOrdersV2} from "@/app/lib/OrderRepository";
import {fetchProduct, fetchProductsById} from "@/app/lib/ProductRepository";
import { NextApiRequest, NextApiResponse } from "next";

BigInt.prototype.toJSON = function() { return this.toString() }

export async function GET(request: Request): Promise<any> {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const paymentOrProductName = searchParams.get("name");
        const paymentId = searchParams.get("payment_id") !== null ? Number(BigInt(searchParams.get("payment_id"))) : null;
        const orders = await fetchOrders(paymentOrProductName)
        return NextResponse.json({ message: "", data: orders, error: {} }, { status: 200 })
    } catch(error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}

// BigInt.prototype.toJSON = function() { return this.toString() }

// export async function GET(request: Request): Promise<any> {
//     try {
//         const url = new URL(request.url);
//         const searchParams = new URLSearchParams(url.searchParams);
//         const orderParam = searchParams.get("name");
//         const orders = await fetchOrdersV2(orderParam ?? "")
//         return NextResponse.json({ message: "", data: orders, error: {} }, { status: 200 })
//     } catch(error) {
//         return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
//     }
// }

const CreateTransaction = TransactionFormSchema.omit({id: true})
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.json();

        const validatedFormData = CreateTransaction.safeParse({
            uid: formData.uid,
            product_id: isNumber(formData.product_id) ? Number(formData.product_id) : formData.product_id,
            payment_id: isNumber(formData.payment_id) ? Number(formData.payment_id) : formData.payment_id,
        })

        if (!validatedFormData.success) {
            return NextResponse.json({
                message: "Create Product failed",
                data: {},
                error: validatedFormData.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const product = await fetchProduct(formData.product_id)
        if (product.quantity <= 0) {
            return NextResponse.json({
                message: "Product Quantity is not valid",
                data: {},
                error: {}
            }, { status: 400 });
        }

        // TODO: James kurangin stok
        await create({
            ...formData,
            price: product.price,
            status_order: 'SUCCESS',
            payment_status: 'PAID',
        })
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}
