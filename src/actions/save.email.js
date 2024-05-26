"use server"

import prisma from "@/shared/libs/db";

export const saveEmail = async ({
    title, 
    content,
    newsLetterOwnerId
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

        if (dbEmail) {
            await prisma.email.update({
                where: {
                    id: dbEmail.id,
                },
                data: {
                    content: content
                }
            });
            console.log("Email updated successfully!");
        } else {
            await prisma.email.create({
                data: {
                    title: title,
                    content: content,
                    newsLetterOwnerId: newsLetterOwnerId
                }
            });
            console.log("Email created successfully!");
        }
    } catch (err) {
        console.log(err);
    }
}
