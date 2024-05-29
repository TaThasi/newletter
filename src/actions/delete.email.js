"use server"


import prisma from "@/shared/libs/db"

export const deleteEmail = async ({
    emailId
}) => {
    try {
        await prisma.email.delete({
            where: {
                id: emailId
            }
        })

        return {
            message: "Email deleted successfully"
        }

    } catch (err) { 
        console.log(err)
    }
}
