import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16' as any,
});


export async function POST(req: NextRequest) {
  const domain = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${domain}/success?paid=true`,
      cancel_url: `${domain}/success?paid=false`,
      subscription_data: {
        trial_period_days: 30,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe error:', err);
    return new NextResponse('Failed to create Stripe session', { status: 500 });
  }
}
