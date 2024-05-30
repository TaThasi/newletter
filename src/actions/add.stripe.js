"use server"

import prisma from "@/shared/libs/db"
import { currentUser } from '@clerk/nextjs/server';
import Stripe from "stripe"
export const addStripe = async () => {
    try {
        const user = await currentUser();
        
        const membership = await prisma.membership.findUnique({
            where: {
                userId: user?.id
            }
        })
        
        if (membership) {
            return {message : "Membership already exists!"} 
        } else {
            const stripe = new Stripe(
                process.env.STRIPE_SECRET_KEY,{
                    apiVersion: "2023-10-16",
                }
            )
            
            await stripe.customers.create({
                email: user?.emailAddresses[0].emailAddress,
                name: `${user?.firstName} ${user?.lastName}`
            })
            .then(async (customer) => {
                const membership = await prisma.membership.create({
                    data: {
                        userId: user.id,
                        stripeCustomerId: customer.id,
                        plan: "Launch"
                    }
                });
                console.log(membership);
            });
        }
    } catch (err) {
        console.log(err);
    }
}