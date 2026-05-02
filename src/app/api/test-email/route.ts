import { NextResponse } from 'next/server'
import { transporter, ADMIN_EMAIL } from '@/lib/mailer'

export async function GET() {
  try {
    const info = await transporter.sendMail({
      from: `"Soultails Test" <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: 'Test Email',
      text: 'If you see this, email is working!',
    })
    return NextResponse.json({ success: true, messageId: info.messageId, config: { user: process.env.GMAIL_USER, passSet: !!process.env.GMAIL_APP_PASSWORD } })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, code: err.code, config: { user: process.env.GMAIL_USER, passSet: !!process.env.GMAIL_APP_PASSWORD } }, { status: 500 })
  }
}
