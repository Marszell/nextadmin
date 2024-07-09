import prisma from './prisma';

export async function fetchGames() : Promise<any[]> {
    return prisma.games.findMany({
        where: {
            deleted_at: null
        }
    });
}

export async function fetchGame(id: number) : Promise<any> {
    return prisma.games.findFirst({
        where: {
            id: id,
            deleted_at: null
        }
    });
}

export async function fetchGameByName(name: string) : Promise<any> {
    return prisma.games.findFirst({
        where: {
            name: name,
        }
    });
}

// export async function fetchGameByNameV2(name: string) : Promise<any> {
//     return prisma.$queryRaw`SELECT * FROM games WHERE name LIKE "%${name}%"`;
// }

export async function fetchGamesV2(name: string) : Promise<any[]> {
    return prisma.games.findMany({
        where: {
            deleted_at: null,
            name: {
                contains: name
            }
        }
    });
}

export async function isExistsByName(name: string) : Promise<boolean> {
    return prisma.games.count({
        where: {
            name: name
        }
    })
    .then(Boolean);
}

export async function create(data: any) : Promise<any> {
    await prisma.games.create({
        data: data
    });
}

export async function update(id: number, data: any) : Promise<any> {
    return prisma.games.update({
        where: {
            id: id
        },
        data: data
    });
}

export async function deleteGame(id: number) : Promise<any> {
    // await prisma.games.update({
    //     where: {
    //         id: id
    //     },
    //     data: {
    //         deleted_at: new Date()
    //     }
    // });
    await prisma.games.delete({
        where: {
            id: id
        }
    })
}