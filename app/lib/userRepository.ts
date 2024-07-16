import prisma from './prisma';

export async function fetchUsers() : Promise<any[]> {
    return prisma.user.findMany({
        where: {
            deleted_at: null
        }
    });
}

export async function fetchUser(id: number) : Promise<any> {
    return prisma.user.findFirst({
        where: {
            id: id,
            deleted_at: null
        }
    });
}

export async function fetchUserByName(name: string) : Promise<any> {
    return prisma.user.findFirst({
        where: {
            name: name,
        }
    });
}

export async function fetchUserByEmail(email: string) : Promise<any> {
    return prisma.user.findFirst({
        where: {
            email: email,
        }
    });
}

// export async function fetchUserByNameV2(name: string) : Promise<any> {
//     return prisma.$queryRaw`SELECT * FROM user WHERE name LIKE "%${name}%"`;
// }

export async function fetchUsersV2(name: string) : Promise<any[]> {
    return prisma.user.findMany({
        where: {
            deleted_at: null,
            name: {
                contains: name
            }
        }
    });
}

export async function isExistsByName(name: string) : Promise<boolean> {
    return prisma.user.count({
        where: {
            name: name
        }
    })
    .then(Boolean);
}

export async function create(data: any) : Promise<any> {
    await prisma.user.create({
        data: data
    });
}

export async function update(id: number, data: any) : Promise<any> {
    return prisma.user.update({
        where: {
            id: id
        },
        data: data
    });
}

export async function deleteUser(id: number) : Promise<any> {
    // await prisma.user.update({
    //     where: {
    //         id: id
    //     },
    //     data: {
    //         deleted_at: new Date()
    //     }
    // });
    await prisma.user.delete({
        where: {
            id: id
        }
    })
}