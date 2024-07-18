import {getServerSession} from "next-auth/next"

import prismadb from "@/app/lib/prisma"
import { authOptions } from "../api/auth/config/nextauth.config"; 
export async function serverAuth (){
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error ("Your not Register");
    }

    const currentUser = await prismadb.user.findUnique({
        where:{
            email: session.user.email,
        },
    });

    if (!currentUser){
        throw new Error ("Your not Register");
    }

    return {currentUser};
}