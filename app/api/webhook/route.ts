import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text(); 
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("[STRIPE_WEBHOOK_ERROR]", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "Metadata: Missing userId or courseId" },
        { status: 400 }
      );
    }

    try {
      await db.purchase.create({
        data: {
          courseId,
          userId,
        },
      });
    } catch (dbError) {
      console.error("[DATABASE_ERROR]", dbError);
      return NextResponse.json(
        { error: "Database error: Could not create purchase" },
        { status: 500 }
      );
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json(
    { message: "Webhook received successfully." },
    { status: 200 }
  );
}
