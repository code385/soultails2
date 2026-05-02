import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { transporter, ADMIN_EMAIL } from '@/lib/mailer'
import { notifyAdmin } from '@/lib/notify'
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

    transporter.sendMail({
      from: `"Soultails Contact" <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: data.email,
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
        </div>
      `,
    }).catch(err => console.error('[CONTACT EMAIL]', err))

    notifyAdmin(
      `New Message: ${data.name}`,
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      (data.phone ? `Phone: ${data.phone}\n` : '') +
      (data.petType ? `Pet: ${data.petType}\n` : '') +
      (data.subject ? `Subject: ${data.subject}\n\n` : '\n') +
      `Message: ${data.message}`
    )

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[CONTACT]', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
