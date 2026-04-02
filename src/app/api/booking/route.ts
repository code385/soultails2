import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const bookingSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(7),
  petName: z.string().min(1),
  petType: z.string().min(1),
  petAge: z.string().optional(),
  petBreed: z.string().optional(),
  serviceType: z.enum(['REMOTE_CONSULTATION','FELINE_BEHAVIOUR','CHRONIC_PAIN','PALLIATIVE_CARE','SENIOR_PET_CARE','NUTRITION_INTEGRATIVE','HOME_VISIT_GENERAL']),
  serviceMode: z.enum(['REMOTE','HOME_VISIT']),
  concern: z.string().min(10),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = bookingSchema.parse(body)

    const booking = await prisma.booking.create({ data })

    // Remote → create Stripe checkout session
    if (data.serviceMode === 'REMOTE') {
      const servicePrices: Record<string, number> = {
        REMOTE_CONSULTATION: 12000,
        FELINE_BEHAVIOUR: 15000,
        NUTRITION_INTEGRATIVE: 10000,
        CHRONIC_PAIN: 13000,
        PALLIATIVE_CARE: 12000,
        SENIOR_PET_CARE: 12000,
        HOME_VISIT_GENERAL: 15000,
      }
      const amount = servicePrices[data.serviceType] ?? 12000
      const serviceLabels: Record<string, string> = {
        REMOTE_CONSULTATION: 'Remote Veterinary Consultation',
        FELINE_BEHAVIOUR: 'Feline Behaviour Consultation',
        NUTRITION_INTEGRATIVE: 'Nutrition & Integrative Care Consultation',
        CHRONIC_PAIN: 'Chronic Pain Management Consultation',
        PALLIATIVE_CARE: 'Palliative Care Consultation',
        SENIOR_PET_CARE: 'Senior Pet Care Consultation',
        HOME_VISIT_GENERAL: 'Home Visit Consultation',
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: data.clientEmail,
        line_items: [{
          price_data: {
            currency: 'gbp',
            product_data: {
              name: serviceLabels[data.serviceType] ?? 'Veterinary Consultation',
              description: `For ${data.petName} — ${data.preferredDate} at ${data.preferredTime}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        }],
        metadata: { bookingId: booking.id },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book?cancelled=true`,
      })

      await prisma.booking.update({
        where: { id: booking.id },
        data: { stripeSessionId: session.id, amount },
      })

      return NextResponse.json({ checkoutUrl: session.url, bookingId: booking.id })
    }

    // Home visit → no payment now, admin checks dashboard
    return NextResponse.json({ success: true, bookingId: booking.id, mode: 'home_visit' })

  } catch (err: any) {
    console.error('[BOOKING]', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
