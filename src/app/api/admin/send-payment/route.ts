import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { formatCurrency } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { bookingId, amount } = await req.json()
  if (!bookingId || !amount) return NextResponse.json({ error: 'bookingId and amount required' }, { status: 400 })

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  // Create Stripe checkout session
  const paymentLink = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: {
          name: `Soultails Home Visit — ${booking.serviceType.replace(/_/g, ' ')}`,
          description: `For ${booking.petName} · ${booking.clientName}`,
        },
        unit_amount: amount,
      },
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-complete`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-cancelled`,
    metadata: { bookingId },
  })

  // Update booking
  await prisma.booking.update({
    where: { id: bookingId },
    data: { paymentStatus: 'PAYMENT_LINK_SENT', amount },
  })

  // Return the payment URL — admin can copy and send manually to client
  return NextResponse.json({ success: true, paymentLinkUrl: paymentLink.url, amount: formatCurrency(amount) })
}
