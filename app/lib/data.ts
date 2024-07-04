import prisma from './prisma';

export async function fetchGames() {
    return await prisma.games.findMany();
}