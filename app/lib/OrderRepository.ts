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
    return prisma.game.count({
        where: {
            deleted_at: null
        }
    });
}