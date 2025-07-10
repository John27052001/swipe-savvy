import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const domain = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
      },
      success_url: `${domain}/success?paid=true`,
      cancel_url: `${domain}/terms`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe checkout error:', err);
    return new NextResponse('Failed to create Stripe session', { status: 500 });
  }
}
 