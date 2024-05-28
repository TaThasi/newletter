"use server"

import prisma from "@/shared/libs/db"



export const getSubscribers = async ({
    newsLetterOwnerId
}) => {
    try {
        const subscribers = await prisma.subscriber.findMany({
            where: {
                newsLetterOwnerId: newsLetterOwnerId
            }
        })

        return subscribers;

    } catch (err) {
        console.log(err)
    }
}



