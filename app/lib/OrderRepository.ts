import prisma from "@/app/lib/prisma";

export async function create(data: any) : Promise<any> {
    // await prisma.order.create({
    //     data: data
    // });
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
    return prisma.order.findMany({
        include: {
            product: true,
            payment: true
        }
    })
    // return prisma.$queryRawUnsafe(`
    //     SELECT o.*, p.id as payment_id, p.name as payment_name , t.id as product_id, t.name as product_name
    //     FROM orders o
    //     JOIN payments p on o.payment_id = p.id ,
    //     JOIN products t on o.product_id = t.id , 
    //     WHERE (o.name ILIKE $1 or p.name ILIKE $1 or t.name ILIKE $1)
    //     AND (coalesce($2, null) is null or p.id = cast(cast($2 as text) as bigint))
    //     AND o.deleted_at is null
    //     AND p.deleted_at is null
    //     AND t.deleted_at is null
    //     `, `%${name}%`, payment_id, product_id)
}

export async function fetchOrdersV2() : Promise<any> {
    return prisma.order.findMany({
        include: {
            product: true,
            payment: true
        }
        // select:{
        //     id: true,
        //     product_id: true,
        //     products: true,
        //     price: true,
        //     status_order: true,
        //     payment_id: true,
        //     payments: true,
        //     created_at:true,
        // }
    })
}