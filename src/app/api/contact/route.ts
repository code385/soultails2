import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { z } from 'zod'

const ADMIN_EMAIL = 'soultailsinfo@gmail.com'

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

    // Notify admin
    resend.emails.send({
      from: 'Soultails Contact <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      reply_to: data.email,
      subject: `New message: ${data.subject ?? 'Contact Form'} — ${data.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;border:1px solid #eee;border-radius:12px">
          <h2 style="color:#B5527A;margin-top:0">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#888;width:110px">Name</td><td style="padding:8px 0;color:#222"><strong>${data.name}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#B5527A">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0;color:#222">${data.phone}</td></tr>` : ''}
            ${data.petType ? `<tr><td style="padding:8px 0;color:#888">Pet Type</td><td style="padding:8px 0;color:#222">${data.petType}</td></tr>` : ''}
            ${data.subject ? `<tr><td style="padding:8px 0;color:#888">Subject</td><td style="padding:8px 0;color:#222">${data.subject}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <p style="color:#444;white-space:pre-wrap;line-height:1.6">${data.message}</p>
          <p style="color:#aaa;font-size:12px;margin-top:24px">Reply directly to this email to respond to ${data.name}.</p>
        </div>
      `,
    }).catch(err => console.error('[CONTACT EMAIL]', err))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[CONTACT]', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
