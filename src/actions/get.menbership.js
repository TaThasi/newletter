"use server"
import prisma from "@/shared/libs/db"
import { currentUser } from "@clerk/nextjs/server";
export const getMembership = async () => {
    try {   

        const user = await currentUser();

        const membership = await prisma.membership.findUnique({
            where: {
                userId: user.id,
            },
        })
        
        return membership;
    } catch (err) {
        console.log(err);
    }
}