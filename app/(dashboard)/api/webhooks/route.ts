import { db } from "@/lib/db/drizzle";
import { Subscription } from "@/lib/models/schema";
import { sendEmail } from "@/lib/nodemailer";
import stripe from "@/lib/Stripe";
import { eq } from "drizzle-orm";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req:NextRequest)=>{
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("Stripe-Signature") as string;

        const event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET_KEY!
        )

        if(event.type === 'checkout.session.completed'){
            const session = event.data.object;

            const customerInfo = {
                clerkId: session.client_reference_id,
                userEmail: session.customer_details?.email
            }

            // const retriveSession = await stripe.checkout.sessions.retrieve(
            //     session.id,
            // )

            const id:any = customerInfo.clerkId

            const order = await db.select().from(Subscription).where(eq(Subscription.clerkId, id));

            if(order.length === 0){
                await db.insert(Subscription).values({
                    clerkId: customerInfo?.clerkId,
                    userEmail: customerInfo?.userEmail,
                    purchaseDate: moment().format('DD-MM-YYYY'),
                    subEnd: moment(new Date().setDate(new Date().getDate() + 28)).format('DD-MM-YYYY'),
                    stripeSubId: session.id
                });

                await sendEmail({ email :customerInfo?.userEmail, emailType: 'Subscription', subscriptionId: session.id})

            }

            await db.update(Subscription).set({
                purchaseDate: moment().format('DD-MM-YYYY'),
                subEnd: moment(new Date().setDate(new Date().getDate() + 28)).format('DD-MM-YYYY'),
                stripeSubId:session.id
            });

        }
        return NextResponse.json(
            { message: "Subscription upgrade successfully", error: false, success: true },
            { status: 200 }
          );
    } catch (error) {
        console.log("[webhook_POST]", error);
    return NextResponse.json(
      { message: "Internal Sever Error", error: true, success: false },
      { status: 500 }
    );
    }
}