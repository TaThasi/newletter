"use server"
import prisma from "@/shared/libs/db"
import Stripe from "stripe"
const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY,{
        apiVersion: "2023-10-16",
    }
)

export const stripeSubscribe = async ({price, userId}) => {
    try {
        const stripeCustomerId = await prisma.membership.findUnique({
            where: {
                userId: userId,
            }, 
            select: {
                stripeCustomerId: true,
            }
        })
        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: stripeCustomerId.stripeCustomerId,
            line_items: [
              {
                price: price,
                quantity: 1,
              },
            ],
            success_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/success",
            cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/error",
            subscription_data: {
              metadata: {
                payingUserId: userId,
              },
            },
          });
      
          if (!checkoutSession.url) {
            return {
              message: "Could not create checkout session!",
            };
          }
        
        return checkoutSession.url
    } catch (err) {
        console.log(err)
    }
}

