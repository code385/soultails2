import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Soultails Veterinary Care',
}

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl font-semibold text-brand-text mb-8">Terms of Service</h1>
        <p className="font-body text-brand-muted text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</p>
        {[
          ['Services', 'Soultails provides veterinary consultations (remote and home visit) by Dr. Claudia Fioravanti DVM MRCVS. All services are subject to clinical judgement and availability.'],
          ['Bookings & cancellation', 'Remote consultations require payment at the time of booking. Cancellations made more than 24 hours before your appointment are eligible for a full refund. Cancellations within 24 hours are non-refundable. Home visit bookings are confirmed by Dr. Claudia and may be rescheduled with reasonable notice.'],
          ['Payment', 'Payments for remote consultations are processed securely via Stripe. Home visit payments are arranged after the visit via a secure payment link. Prices are displayed in GBP and include VAT where applicable.'],
          ['Medical advice', 'Consultations provide veterinary advice based on the information provided. In case of emergency, please contact your nearest emergency veterinary practice immediately. Soultails does not provide emergency services.'],
          ['Limitation of liability', 'Soultails and Dr. Claudia Fioravanti are not liable for any indirect or consequential losses arising from the use of our services beyond the scope of standard veterinary professional liability.'],
          ['Governing law', 'These terms are governed by the laws of England and Wales. Dr. Claudia Fioravanti is registered with the Royal College of Veterinary Surgeons (RCVS).'],
          ['Contact', 'For any queries regarding these terms, please email soultailsinfo@gmail.com.'],
        ].map(([title, body]) => (
          <div key={title as string} className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-brand-text mb-3">{title}</h2>
            <p className="font-body text-brand-muted leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
