"use server"

import prisma from "@/shared/libs/db"

export const GetEmailDetails = async ({
    title,
    newsLetterOwnerId,
}) => {
    try {
        const dbEmail = await prisma.email.findUnique({
            where: {
                title_newsLetterOwnerId: {
                    title,
                    newsLetterOwnerId
                }
            }
        });

        return dbEmail;
    } catch (err) {
        console.log(err)
    }
}

