import { Resend } from "resend"

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error("RESEND_API_KEY is not set")
    _resend = new Resend(key)
  }
  return _resend
}

export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    return (getResend() as any)[prop]
  },
})

export const FROM = process.env.EMAIL_FROM ?? "soultailsinfo@gmail.com"
export const ADMIN = process.env.ADMIN_EMAIL ?? "soultailsinfo@gmail.com"
