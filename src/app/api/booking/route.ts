import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { transporter, ADMIN_EMAIL } from '@/lib/mailer'
import { z } from 'zod'

const bookingSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(7),
  petName: z.string().min(1),
  petType: z.string().min(1),
  petAge: z.string().optional(),
  petBreed: z.string().optional(),
  serviceType: z.string().min(1),
  serviceMode: z.enum(['REMOTE', 'HOME_VISIT']),
  concern: z.string().min(10),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = bookingSchema.parse(body)

    const booking = await prisma.booking.create({ data })

    const serviceLabel = data.serviceType.replace(/_/g, ' ')
    const modeLabel = data.serviceMode === 'REMOTE' ? 'Remote / Online' : 'Home Visit'

    transporter.sendMail({
      from: `"Soultails Bookings" <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: data.clientEmail,
      subject: `New enquiry: ${serviceLabel} — ${data.clientName}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;border:1px solid #eee;border-radius:12px">
          <h2 style="color:#B5527A;margin-top:0">New Booking Enquiry</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#888;width:120px">Client</td><td style="padding:8px 0;color:#222"><strong>${data.clientName}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${data.clientEmail}" style="color:#B5527A">${data.clientEmail}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0;color:#222">${data.clientPhone}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Pet</td><td style="padding:8px 0;color:#222">${data.petName} (${data.petType}${data.petAge ? ', '+data.petAge : ''})</td></tr>
            <tr><td style="padding:8px 0;color:#888">Service</td><td style="padding:8px 0;color:#222">${serviceLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Mode</td><td style="padding:8px 0;color:#222">${modeLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Preferred</td><td style="padding:8px 0;color:#222">${data.preferredDate} at ${data.preferredTime}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <p style="color:#444;line-height:1.6"><strong>Concern:</strong><br/>${data.concern}</p>
        </div>
      `,
    }).catch(err => console.error('[BOOKING EMAIL]', err))

    return NextResponse.json({ success: true, bookingId: booking.id })
  } catch (err: any) {
    console.error('[BOOKING]', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: err?.message ?? 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
