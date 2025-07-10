import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});

export async function POST(req: NextRequest) {
  const domainURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${domainURL}/success?paid=true`,
      cancel_url: `${domainURL}/success?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[STRIPE_CHECKOUT_ERROR]', err);
    return NextResponse.json({ error: 'Checkout session failed' }, { status: 500 });
  }
}
