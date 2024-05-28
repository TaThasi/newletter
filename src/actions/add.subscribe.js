"use server"

import prisma from "@/shared/libs/db";
import { validateEmail } from "@/shared/utils/ZeroBounceApi";
import { clerkClient } from "@clerk/nextjs/server";

export const subscribe = async ({ email, username }) => {
    try {
        const allUsers = await clerkClient.users.getUserList();

        // console.log(allUsers);
        const newsLetterOwner = allUsers.data.find((user) => user.firstName === username);
        // console.log(newsLetterOwner);
        if (!newsLetterOwner) {
            return { error: "Newsletter owner not found!" };
        }

        const isSubscribeExist = await prisma.subscriber.findUnique({
            where: {
                email_newsLetterOwnerId: {
                    email,
                    newsLetterOwnerId: newsLetterOwner.id
                }
            }
        });


        if (isSubscribeExist) {
            return {error:"Email already subscribed!"};
        }

        const validateResponse = await validateEmail({ email });
        if (validateResponse.status === "invalid") {
            return {error: "Email is not valid!"};
        }
        console.log(validateResponse);
        const subscriber = await prisma.subscriber.create({
            data: {
                email,
                newsLetterOwnerId: newsLetterOwner.id,
                source: "By newsLetter website",
                status: "subscribed"
            }
        }); 
        
        console.log("Ok!")

        return subscriber;
    } catch (err) {
        console.log(err);
        return {error: "An error occurred!"};
    }
};

