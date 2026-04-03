import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } })
  // Always return success to prevent email enumeration
  if (!user) return NextResponse.json({ success: true })

  const token = crypto.randomBytes(32).toString('hex')
  const expiry = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expiry },
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const resetUrl = `${siteUrl}/admin/reset-password?token=${token}`

  await resend.emails.send({
    from: 'Soultails Admin <onboarding@resend.dev>',
    to: user.email,
    subject: 'Reset your admin password',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
        <h2 style="color:#B5527A">Reset your password</h2>
        <p>You requested a password reset for your Soultails admin account.</p>
        <p>Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#B5527A;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">
          Reset Password
        </a>
        <p style="color:#888;font-size:13px">If you did not request this, ignore this email.</p>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
