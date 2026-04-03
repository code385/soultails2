import nodemailer from 'nodemailer'

export const ADMIN_EMAIL = process.env.GMAIL_USER ?? 'soultailsinfo@gmail.com'

let _transporter: nodemailer.Transporter | null = null

export function getTransporter(): nodemailer.Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    })
  }
  return _transporter
}

// Backward-compat export used across routes
export const transporter = new Proxy({} as nodemailer.Transporter, {
  get(_target, prop) {
    return (getTransporter() as any)[prop]
  },
})
