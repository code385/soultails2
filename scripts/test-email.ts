import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Manually parse .env.local
try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
} catch {
  console.error('Could not read .env.local')
}

const user = process.env.GMAIL_USER
const pass = process.env.GMAIL_APP_PASSWORD

console.log('GMAIL_USER       :', user)
console.log('GMAIL_APP_PASSWORD:', pass ? `${pass.slice(0, 4)}****` : 'NOT SET')

if (!user || !pass) {
  console.error('\n❌ Credentials not found in .env.local')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user, pass },
})

async function main() {
  console.log('\nVerifying SMTP connection...')
  await transporter.verify()
  console.log('✅ SMTP connection OK')

  console.log('Sending test email to', user)
  const info = await transporter.sendMail({
    from: `"Soultails Test" <${user}>`,
    to: user,
    subject: 'Test email from Soultails',
    html: '<p>If you see this, nodemailer is working correctly!</p>',
  })
  console.log('✅ Email sent! ID:', info.messageId)
}

main().catch(err => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
