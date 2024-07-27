import prisma from './prisma';

export async function fetchGames() : Promise<any[]> {
    return prisma.game.findMany({
        where: {
            deleted_at: null
        }
    });
}

export async function fetchGame(id: number) : Promise<any> {
    return prisma.game.findFirst({
        where: {
            id: id,
            deleted_at: null
        }
    });
}

export async function fetchGameByName(name: string) : Promise<any> {
    return prisma.game.findFirst({
        where: {
            name: name,
        }
    });
}

export async function fetchGamesV2(name: string) : Promise<any[]> {
    return prisma.game.findMany({
        where: {
            deleted_at: null,
            name: {
                contains: name
            }
        }
    });
}

export async function isExistsByName(name: string) : Promise<boolean> {
    return prisma.game.count({
        where: {
            name: name
        }
    })
    .then(Boolean);
}

export async function create(data: any) : Promise<any> {
    await prisma.game.create({
        data: data
    });
}

export async function update(id: number, data: any) : Promise<any> {
    return prisma.game.update({
        where: {
            id: id
        },
        data: data
    });
}

export async function deleteGameAndProduct(id: number) : Promise<any> {
    await prisma.$transaction([
        prisma.game.update({
            where: {
                id: id
            },
            data: {
                deleted_at: new Date()
            }
        }),
        prisma.product.updateMany({
            where: {
                game_id: id
            },
            data: {
                deleted_at: new Date()
            }
        })
    ]);
}

export async function countGames() : Promise<number> {
    return prisma.game.count({
        where: {
            deleted_at: null
        }
    });
}