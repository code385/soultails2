import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Soultails Veterinary Care',
}

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="font-heading text-4xl font-semibold text-brand-text mb-8">Privacy Policy</h1>
        <p className="font-body text-brand-muted text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</p>
        {[
          ['Information we collect', 'When you book a consultation or contact us, we collect your name, email address, phone number, and details about your pet. This information is used solely to provide our veterinary services and communicate with you about your booking.'],
          ['How we use your information', 'Your information is used to manage bookings, send appointment confirmations, process payments via Stripe, and respond to enquiries. We do not sell your data to third parties.'],
          ['Payment security', 'All payments are processed by Stripe, a PCI-DSS compliant payment processor. We do not store your card details on our servers.'],
          ['Data retention', 'We retain your booking and contact information for up to 7 years for regulatory compliance. You may request deletion of your data at any time by contacting us.'],
          ['Cookies', 'This website uses essential cookies for authentication and analytics. By using this site you consent to our use of cookies.'],
          ['Your rights', 'Under UK GDPR, you have the right to access, correct, or delete your personal data. To exercise these rights, please contact hello@soultails.com.'],
          ['Contact', 'For any privacy-related queries, please email hello@soultails.com.'],
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
