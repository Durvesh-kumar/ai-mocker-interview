import stripe from "@/lib/Stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { services, customer } = await req.json();

    if (!services || !customer) {
      return NextResponse.json(
        { message: "Not enugh data to checkout", error: true, success: false },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
    },
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: services.serviceName,
            },
            unit_amount: services.amount * 100,
          },
          quantity: 1,
        },
      ],
      client_reference_id: customer.clerkId,
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment_success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pugrade`,
    });

    return NextResponse.json(session, {status: 200});
  } catch (error) {
    console.log("[checkout_POST]", error);
    return NextResponse.json(
      { message: "Internal Sever Error", error: true, success: false },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic'