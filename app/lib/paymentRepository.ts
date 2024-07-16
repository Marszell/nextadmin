import prisma from './prisma';

export async function fetchPayments() : Promise<any[]> {
    return prisma.payment.findMany({
        where: {
            deleted_at: null
        }
    });
}

export async function fetchPayment(id: number) : Promise<any> {
    return prisma.payment.findFirst({
        where: {
            id: id,
            deleted_at: null
        }
    });
}

export async function fetchPaymentByName(name: string) : Promise<any> {
    return prisma.payment.findFirst({
        where: {
            name: name,
        }
    });
}

export async function fetchPaymentsV2(name: string) : Promise<any[]> {
    return prisma.payment.findMany({
        where: {
            deleted_at: null,
            name: {
                contains: name
            }
        }
    });
}

export async function isExistsByName(name: string) : Promise<boolean> {
    return prisma.payment.count({
        where: {
            name: name
        }
    })
    .then(Boolean);
}

export async function create(data: any) : Promise<any> {
    await prisma.payment.create({
        data: data
    });
}

export async function update(id: number, data: any) : Promise<any> {
    return prisma.payment.update({
        where: {
            id: id
        },
        data: data
    });
}

export async function deletePayment(id: number) : Promise<any> {
    await prisma.payment.delete({
        where: {
            id: id
        }
    })
}