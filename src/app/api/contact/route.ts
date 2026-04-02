import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resend, FROM, ADMIN } from '@/lib/resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  petType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    await prisma.contactMessage.create({ data })

    await resend.emails.send({
      from: FROM,
      to: ADMIN,
      reply_to: data.email,
      subject: `New message from ${data.name} — Soultails`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#B5527A;font-size:20px;margin-bottom:16px">New contact message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6B5060;font-size:14px;width:120px">Name</td><td style="padding:8px 0;font-weight:600;font-size:14px">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6B5060;font-size:14px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${data.email}" style="color:#B5527A">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding:8px 0;color:#6B5060;font-size:14px">Phone</td><td style="padding:8px 0;font-size:14px">${data.phone}</td></tr>` : ''}
            ${data.petType ? `<tr><td style="padding:8px 0;color:#6B5060;font-size:14px">Pet type</td><td style="padding:8px 0;font-size:14px">${data.petType}</td></tr>` : ''}
          </table>
          <div style="margin-top:16px;padding:16px;background:#FDF8F5;border-radius:8px">
            <p style="font-size:14px;color:#2C1F2E;line-height:1.6;margin:0">${data.message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#A8899A">Reply directly to this email to respond to ${data.name}.</p>
        </div>
      `,
    })

    // Auto-reply to sender
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: 'Thank you for getting in touch — Soultails',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <div style="text-align:center;margin-bottom:24px">
            <h1 style="color:#B5527A;font-size:22px;margin-bottom:4px">Soultails</h1>
            <p style="color:#A8899A;font-size:13px">Veterinary Care</p>
          </div>
          <h2 style="color:#2C1F2E;font-size:18px;margin-bottom:12px">Thank you, ${data.name}!</h2>
          <p style="color:#6B5060;font-size:15px;line-height:1.7">We have received your message and Dr. Claudia will be in touch within 24 hours.</p>
          <p style="color:#6B5060;font-size:15px;line-height:1.7">If your matter is urgent, please use our booking system to schedule a consultation directly.</p>
          <div style="margin-top:24px;text-align:center">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/book" style="display:inline-block;background:#B5527A;color:white;padding:12px 28px;border-radius:50px;font-size:14px;font-weight:600;text-decoration:none">Book a consultation</a>
          </div>
          <p style="margin-top:32px;font-size:12px;color:#A8899A;text-align:center">Soultails Veterinary Care · soultails.com</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[CONTACT]', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
