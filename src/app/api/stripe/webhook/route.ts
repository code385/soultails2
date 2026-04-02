import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendPaymentConfirmationToClient, sendBookingConfirmationToAdmin } from '@/emails'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('[WEBHOOK] Invalid signature:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.bookingId
    if (!bookingId) return NextResponse.json({ received: true })

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        stripePaymentId: session.payment_intent as string,
        confirmedDate: new Date(),
      },
    })

    // Send emails
    await Promise.allSettled([
      sendPaymentConfirmationToClient(booking),
      sendBookingConfirmationToAdmin(booking),
    ])
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.bookingId
    if (bookingId) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CANCELLED' },
      })
    }
  }

  return NextResponse.json({ received: true })
}

// App Router mein body parsing disable karne ka sahi tarika
export const dynamic = 'force-dynamic'
