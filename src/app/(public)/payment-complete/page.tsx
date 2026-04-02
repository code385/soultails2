import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payment Received — Thank you',
  robots: { index: false },
}

export default function PaymentCompletePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-primary" />
        </div>
        <h1 className="font-heading text-4xl font-semibold text-brand-text mb-4">
          Payment received!
        </h1>
        <p className="font-body text-lg text-brand-muted leading-relaxed mb-8">
          Thank you for your payment. A receipt has been sent to your email. We look forward to caring for your pet again soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary px-8 py-3">Back to home</Link>
          <Link href="/book" className="btn-outline px-8 py-3">Book again</Link>
        </div>
      </div>
    </div>
  )
}
