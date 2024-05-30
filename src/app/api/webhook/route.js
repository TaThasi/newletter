import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/libs/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});

const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

export async function POST(req) {
    try {
        const buf = await req.text();
        const sig = req.headers.get('stripe-signature');

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webHookSecret);
        } catch (err) {
            console.error('Webhook signature verification failed.', err.message);
            return new NextResponse('Webhook error: Invalid signature', {
                status: 400,
                headers: {
                    'content-type': 'application/json',
                },
            });
        }

        console.log("Success: ", event.id);
        const subscription = event.data.object;
        console.log("Subscription: ", subscription);
        
        // Retrieving the price ID and then the product ID
        const priceId = subscription.items.data[0].price.id;
        console.log("Price ID: ", priceId);

        const price = await stripe.prices.retrieve(priceId);
        const productId = price.product;
        console.log("Product ID: ", productId);

        const product = await stripe.products.retrieve(productId);
        const planName = product.name;
        console.log("Plan Name: ", planName);
        console.log(event.type);
        switch (event.type) {
            case 'checkout.session.completed':
                console.log("Checkout completed!");
                const membership = await prisma.membership.findFirst({
                    where: {
                        stripeCustomerId: subscription.customer,
                    },
                });

                if (membership) {
                    await prisma.membership.update({
                        where: {
                            stripeCustomerId: subscription.customer,
                        },
                        data: {
                            plan: planName,
                        },
                    });
                }
                break;

            default:
                console.warn(`Unhandled event type: ${event.type}`);
        }

        return new NextResponse(null, {
            status: 200,
        });

    } catch (err) {
        console.error('Webhook handler failed.', err.message);
        return new NextResponse('Webhook error', {
            status: 400,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
}
