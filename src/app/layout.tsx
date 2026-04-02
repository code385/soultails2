import type { Metadata } from 'next'
import { Cormorant_Garamond, Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { LocalBusinessSchema } from '@/components/SchemaOrg'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL((() => { const u = process.env.NEXT_PUBLIC_SITE_URL || 'https://soultails.com'; return u.startsWith('http') ? u : `https://${u}`; })()),
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/icon.png',
  },
  title: {
    default: 'Soultails | Expert Integrative Veterinary Care — Dr. Claudia Fioravanti',
    template: '%s | Soultails Veterinary Care',
  },
  description: 'Expert integrative veterinary care for cats, dogs and senior pets. Home visits and remote consultations across the UK. DVM MRCVS CertAVP ISFMAdvCerFB.',
  keywords: ['integrative vet UK', 'feline behaviour expert UK', 'home visit vet London', 'online vet consultation UK', 'cat pain management', 'palliative pet care UK', 'senior pet care expert', 'holistic vet UK'],
  authors: [{ name: 'Dr. Claudia Fioravanti', url: 'https://soultails.com' }],
  openGraph: {
    type: 'website', locale: 'en_GB', url: 'https://soultails.com',
    siteName: 'Soultails Veterinary Services',
    title: 'Soultails | Expert Integrative Veterinary Care',
    description: 'Expert integrative vet care — home visits and remote consultations across the UK.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Soultails Veterinary Services' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${nunito.variable}`}>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="font-body antialiased" style={{ background: 'var(--color-cream)', color: 'var(--color-text)' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
