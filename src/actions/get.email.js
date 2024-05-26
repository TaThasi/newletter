"use server"

import prisma from "@/shared/libs/db";

export const getEmails = async ({ newsLetterOwnerId }) => {
    try {
        const dbEmails = await prisma.email.findMany({
            where: {
                newsLetterOwnerId: newsLetterOwnerId
            },
        });

        return dbEmails;

    } catch (err) {
        console.error("Error fetching emails:", err);
        throw new Error("Failed to fetch emails");
    }
}
