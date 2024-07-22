import prisma from './prisma';

export async function fetchProducts() : Promise<any[]> {
    return prisma.product.findMany({
        where: {
            deleted_at: null
        }
    });
}


export async function fetchGame(): Promise<any> {
    return await prisma.product.findMany({
      include: {
        game: true,
      }
    });
  }

export async function fetchProduct(id: number) : Promise<any> {
    return prisma.product.findFirst({
        where: {
            id: id,
            deleted_at: null
        }
    });
}

export async function fetchProductByName(name: string) : Promise<any> {
    return prisma.product.findFirst({
        where: {
            name: name,
        }
    });
}

export async function fetchProductsById(id:number) : Promise<any>{
    return prisma.product.findMany({
        where: {
            game_id: id
        }
    });
}

export async function fetchProductsV2(name: string) : Promise<any[]> {
    return prisma.product.findMany({
        include: {
            game: true,
          },
        where: {
            deleted_at: null,
            name: {
                contains: name
            }
        }
    });
}

export async function isExistsByName(name: string) : Promise<boolean> {
    return prisma.product.count({
        where: {
            name: name
        }
    })
    .then(Boolean);
}

export async function create(data: any) : Promise<any> {
    await prisma.product.create({
        data: data
    });
}

export async function update(id: number, data: any) : Promise<any> {
    return prisma.product.update({
        where: {
            id: id
        },
        data: data
    });
}

export async function deleteProduct(id: number) : Promise<any> {
    await prisma.product.delete({
        where: {
            id: id
        }
    })
}

// export async function deleteProductByGame(game_id: number) : Promise<any> {
//     await prisma.product.updateMany({
//         where: {
//             game_id: game_id
//         },
//         data: {
//             deleted_at: new Date()
//         }
//     });
// }