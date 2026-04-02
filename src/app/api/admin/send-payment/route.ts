import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { resend, FROM } from '@/lib/resend'
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

  // Email payment link to client
  await resend.emails.send({
    from: FROM,
    to: booking.clientEmail,
    subject: `Payment for your Soultails consultation — ${formatCurrency(amount)}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <div style="text-align:center;margin-bottom:24px">
          <h1 style="color:#B5527A;font-size:22px">Soultails</h1>
        </div>
        <h2 style="color:#2C1F2E;font-size:18px">Hello ${booking.clientName},</h2>
        <p style="color:#6B5060;font-size:15px;line-height:1.7">Thank you for welcoming Dr. Claudia into your home. Please find your payment link below.</p>
        <div style="background:#FDF8F5;border-radius:12px;padding:20px;margin:20px 0;text-align:center">
          <p style="margin:0 0 4px;color:#6B5060;font-size:13px">Amount due</p>
          <p style="margin:0 0 16px;color:#2C1F2E;font-size:28px;font-weight:700">${formatCurrency(amount)}</p>
          <a href="${paymentLink.url}" style="display:inline-block;background:#B5527A;color:white;padding:14px 32px;border-radius:50px;font-size:15px;font-weight:600;text-decoration:none">Pay securely</a>
        </div>
        <p style="color:#A8899A;font-size:12px;text-align:center">Secure payment powered by Stripe. Your card details are never stored by Soultails.</p>
      </div>
    `,
  })

  return NextResponse.json({ success: true, paymentLinkUrl: paymentLink.url })
}
