import {deletePayment, fetchPayment, fetchPaymentByName, update} from "@/app/lib/PaymentRepository";
import {NextResponse} from "next/server";
import {unlink, writeFile} from "fs/promises";
import path from "path";
import {PaymentFormSchema} from "@/app/lib/Validations";

export async function DELETE(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const payment = await fetchPayment(id);
        await unlink(path.join(process.cwd(), "./public/" + payment.image_url));
        await deletePayment(id)
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}

export async function GET(request : Request, { params }) : Promise<NextResponse> {
    try {
        const id = parseInt(params.id)
        const payment = await fetchPayment(id)
        return NextResponse.json({ message: "", data: payment, error: {} }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 })
    }
}

const UpdatePayment = PaymentFormSchema.omit({file: true})
export async function PUT(req : Request, { params }) : Promise<NextResponse> {
    try {
        const formData = await req.formData()

        const validatedFormData = UpdatePayment.safeParse({
            id: parseInt(params['id']),
            name: formData.get("name"),
            file: formData.get("file"),
        })

        if (!validatedFormData.success) {
            return NextResponse.json({
                message: "Update Payment failed",
                data: {},
                error: validatedFormData.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const file = formData.get("file")
        const id = parseInt(params.id)
        const paymentName = formData.get("name").toString();
        const paymentById = await fetchPayment(id);
        const paymentByName = await fetchPaymentByName(paymentName);
        if (paymentByName !== null && parseInt(paymentByName.id) !== id ) {
            return NextResponse.json(
                {
                    message: "Duplicate Payment Name",
                    data: {},
                    error: {},
                },
                {status: 400})
        }
        let fileName = paymentById.image_url;
        if (file !== "undefined" && fileName !== null) {
            const buffer = Buffer.from(await file.arrayBuffer())
            fileName = "/uploads/" + Date.now() + file.name.replaceAll(" ","_");

            await writeFile(
                path.join(process.cwd(), "./public/" + fileName),
                buffer
            );

            await unlink(path.join(process.cwd(), "./public/" + paymentById.image_url));
        }
        const form = {}
        for (const pair of formData.entries()){
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