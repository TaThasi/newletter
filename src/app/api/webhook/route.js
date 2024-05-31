import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/libs/db";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const webhookSecret  = process.env.STRIPE_WEBHOOK_SECRET_KEY;

const webhookHandler = async (req) => {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return new NextResponse('Webhook error: Invalid signature', {
            status: 400,
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    console.log("✅ Success:", event.id);

    const subscription = event.data.object;
    const itemId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(itemId); 
    const planName = product.name;

    switch (event.type) {
        case 'customer.subscription.created':
            const membership = await prisma.membership.findFirst({
                where: {
                    stripeCustomerId: subscription.customer,
                }
            });

            console.log("customer.subscription.created")
            console.log("Membership: ",membership);
            if(membership) {
                await prisma.membership.update({
                    where: {
                        userId: membership.userId,
                    },
                    data: {
                        plan: planName
                    }
                })
            }
            break;

            case '':
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
};

export { webhookHandler as POST };