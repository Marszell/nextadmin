import {ProductFormSchema, TransactionFormSchema} from "@/app/lib/Validations";
import {NextResponse} from "next/server";
import {isNumber} from "@/app/lib/Utils";
import {writeFile} from "fs/promises";
import path from "path";
import {create} from "@/app/lib/OrderRepository";
import {fetchProduct, fetchProductsById} from "@/app/lib/ProductRepository";

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