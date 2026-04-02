import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Calendar, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  robots: { index: false },
}

export default function BookSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-primary" />
        </div>

        <h1 className="font-heading text-4xl font-semibold text-brand-text mb-4">
          Booking confirmed!
        </h1>

        <p className="font-body text-lg text-brand-muted leading-relaxed mb-8">
          Your payment was successful and your consultation is booked. 
          Dr. Claudia will send you a Zoom link before your appointment.
        </p>

        <div className="bg-white rounded-2xl border border-linen p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
              <Video size={16} className="text-primary" />
            </div>
            <div>
              <div className="font-body text-sm font-semibold text-brand-text mb-0.5">Check your email</div>
              <div className="font-body text-sm text-brand-muted">A confirmation with your booking details has been sent to your email address.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
              <Calendar size={16} className="text-primary" />
            </div>
            <div>
              <div className="font-body text-sm font-semibold text-brand-text mb-0.5">How to prepare</div>
              <div className="font-body text-sm text-brand-muted">Have your pet nearby, note any symptoms or questions, and ensure good lighting for your video call.</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary px-8 py-3">
            Back to home
          </Link>
          <Link href="/blog" className="btn-outline px-8 py-3">
            Read our blog
          </Link>
        </div>

        <p className="font-body text-xs text-brand-subtle mt-8">
          Questions? Email us at{' '}
          <a href="mailto:soultailsinfo@gmail.com" className="text-primary hover:underline">
            soultailsinfo@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
