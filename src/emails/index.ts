import { resend, FROM, ADMIN } from '@/lib/resend'
import { formatCurrency, formatDate } from '@/lib/utils'

export async function sendBookingConfirmationToAdmin(booking: any) {
  const modeLabel = booking.serviceMode === 'HOME_VISIT' ? 'Home Visit' : 'Remote (Zoom)'
  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `New booking: ${booking.clientName} — ${booking.serviceType.replace(/_/g,' ')}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#B5527A;margin-bottom:16px">New Booking Received</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr style="background:#FDF8F5"><td style="padding:10px;font-weight:600;width:140px">Client</td><td style="padding:10px">${booking.clientName}</td></tr>
          <tr><td style="padding:10px;font-weight:600">Email</td><td style="padding:10px"><a href="mailto:${booking.clientEmail}">${booking.clientEmail}</a></td></tr>
          <tr style="background:#FDF8F5"><td style="padding:10px;font-weight:600">Phone</td><td style="padding:10px">${booking.clientPhone}</td></tr>
          <tr><td style="padding:10px;font-weight:600">Pet</td><td style="padding:10px">${booking.petName} (${booking.petType}${booking.petAge ? ', '+booking.petAge : ''})</td></tr>
          <tr style="background:#FDF8F5"><td style="padding:10px;font-weight:600">Service</td><td style="padding:10px">${booking.serviceType.replace(/_/g,' ')}</td></tr>
          <tr><td style="padding:10px;font-weight:600">Mode</td><td style="padding:10px">${modeLabel}</td></tr>
          <tr style="background:#FDF8F5"><td style="padding:10px;font-weight:600">Preferred date</td><td style="padding:10px">${booking.preferredDate} at ${booking.preferredTime}</td></tr>
          <tr><td style="padding:10px;font-weight:600;vertical-align:top">Concern</td><td style="padding:10px">${booking.concern}</td></tr>
        </table>
        <div style="margin-top:20px;text-align:center">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/bookings" style="display:inline-block;background:#B5527A;color:white;padding:12px 24px;border-radius:50px;font-size:14px;font-weight:600;text-decoration:none">View in admin panel</a>
        </div>
      </div>
    `,
  })
}

export async function sendPaymentConfirmationToClient(booking: any) {
  return resend.emails.send({
    from: FROM,
    to: booking.clientEmail,
    subject: `Booking confirmed — Soultails`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <div style="text-align:center;margin-bottom:24px">
          <h1 style="color:#B5527A;font-size:22px">Soultails</h1>
        </div>
        <h2 style="color:#2C1F2E">Your booking is confirmed!</h2>
        <p style="color:#6B5060;font-size:15px;line-height:1.7">Hello ${booking.clientName}, your consultation for <strong>${booking.petName}</strong> is confirmed. Dr. Claudia will send you the Zoom link before your appointment.</p>
        <div style="background:#FAF0F4;border-radius:12px;padding:20px;margin:20px 0">
          <p style="margin:0 0 8px;color:#7A2550;font-size:14px"><strong>Date:</strong> ${booking.preferredDate} at ${booking.preferredTime}</p>
          <p style="margin:0 0 8px;color:#7A2550;font-size:14px"><strong>Service:</strong> ${booking.serviceType.replace(/_/g,' ')}</p>
          ${booking.amount ? `<p style="margin:0;color:#7A2550;font-size:14px"><strong>Paid:</strong> ${formatCurrency(booking.amount)}</p>` : ''}
        </div>
        <h3 style="color:#2C1F2E;font-size:16px">How to prepare</h3>
        <ul style="color:#6B5060;font-size:14px;line-height:1.8;padding-left:20px">
          <li>Have your pet nearby and comfortable</li>
          <li>Prepare a list of symptoms or concerns</li>
          <li>Note any medications your pet currently takes</li>
          <li>Ensure a quiet space with good lighting for video</li>
        </ul>
        <p style="color:#A8899A;font-size:12px;margin-top:24px;text-align:center">Questions? Reply to this email or visit soultails.com</p>
      </div>
    `,
  })
}

export async function sendHomeVisitConfirmation(booking: any) {
  return resend.emails.send({
    from: FROM,
    to: booking.clientEmail,
    subject: `Home visit confirmed — Soultails`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <div style="text-align:center;margin-bottom:24px">
          <h1 style="color:#B5527A">Soultails</h1>
        </div>
        <h2 style="color:#2C1F2E">Your home visit is confirmed!</h2>
        <p style="color:#6B5060;font-size:15px;line-height:1.7">Hello ${booking.clientName}, Dr. Claudia will visit you to care for <strong>${booking.petName}</strong>.</p>
        <div style="background:#FAF0F4;border-radius:12px;padding:20px;margin:20px 0">
          <p style="margin:0 0 8px;color:#7A2550;font-size:14px"><strong>Confirmed date:</strong> ${booking.confirmedDate ? formatDate(booking.confirmedDate) : booking.preferredDate}</p>
          <p style="margin:0;color:#7A2550;font-size:14px"><strong>Service:</strong> ${booking.serviceType.replace(/_/g,' ')}</p>
        </div>
        <p style="color:#6B5060;font-size:14px;line-height:1.7">Payment will be arranged after the visit. You will receive a secure payment link by email.</p>
        <p style="color:#A8899A;font-size:12px;margin-top:24px;text-align:center">soultails.com</p>
      </div>
    `,
  })
}
