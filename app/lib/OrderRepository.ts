import prisma from "@/app/lib/prisma";

export async function create(data: any) : Promise<any> {
    await prisma.$transaction([
        prisma.order.create({
            data: data
        }),
        prisma.product.update({
            where: {
                id: data.product_id
            },
            data: {
                quantity: {
                    decrement: 1
                }
            }
        })
    ])
}

export async function countOrders() : Promise<number> {
    return prisma.order.count({
        where: {
            deleted_at: null
        }
    });
}

export async function fetchOrders(name:string) : Promise<any> {
    return prisma.$queryRawUnsafe(`
        SELECT o.*, pa.name as payment_name, pr.name as product_name, pr.image_url as product_image_url
        FROM orders o
        JOIN payments pa on o.payment_id = pa.id
        JOIN products pr on o.product_id = pr.id
        WHERE (pr.name ILIKE $1 or pr.name ILIKE $1)
        AND o.deleted_at is null
        AND pa.deleted_at is null
        AND pr.deleted_at is null
        `, `%${name}%`)
}

export async function fetchOrdersV2() : Promise<any> {
    return prisma.order.findMany({
        include: {
            product: true,
            payment: true
        }
    })
}