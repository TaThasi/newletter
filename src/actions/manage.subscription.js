"use server"

import Stripe from "stripe";
export const manageSubscription = async ({customerId}) => {
    try {
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2023-10-16",
        });

        const potalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/dashboard",
        })
        

        return potalSession.url;
        
    } catch (err) {
        console.log(err);
    }
}