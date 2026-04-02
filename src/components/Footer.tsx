import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Clock, Instagram, Linkedin, Facebook } from 'lucide-react'

const services = [
  { label: 'Remote Consultation', href: '/services/remote-consultation' },
  { label: 'Home Visits', href: '/services/home-visit-vet' },
  { label: 'Feline Behaviour', href: '/services/feline-behaviour' },
  { label: 'Chronic Pain Management', href: '/services/chronic-pain-management' },
  { label: 'Palliative Care', href: '/services/palliative-care' },
  { label: 'Senior Pet Care', href: '/services/senior-pet-care' },
  { label: 'Nutrition & Integrative', href: '/services/nutrition-integrative' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#2D1F35' }}>
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 flex-shrink-0 bg-white/10 rounded-xl p-1.5">
                <Image src="/logo.png" alt="Soultails" fill className="object-contain p-0.5" />
              </div>
              <div>
                <div className="font-heading text-xl font-semibold" style={{ color: '#B784C4' }}>Soultails</div>
                <div className="font-body text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>Veterinary Services</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-body mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Compassionate, expert integrative veterinary care — in your home and online, across the UK.
            </p>
            <div className="flex gap-3">
              {[{ href: '#', Icon: Instagram, label: 'Instagram' }, { href: '#', Icon: Linkedin, label: 'LinkedIn' }, { href: '#', Icon: Facebook, label: 'Facebook' }].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(183,132,196,0.2)' }}>
                  <Icon size={14} style={{ color: '#B784C4' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-body font-bold text-sm tracking-wide mb-4" style={{ color: 'white' }}>Services</h3>
            <ul className="space-y-2.5">
              {services.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-body transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-body font-bold text-sm tracking-wide mb-4" style={{ color: 'white' }}>Quick links</h3>
            <ul className="space-y-2.5">
              {[{ label: 'Home', href: '/' }, { label: 'About Dr. Claudia', href: '/about' }, { label: 'Blog & Resources', href: '/blog' }, { label: 'Book a consultation', href: '/book' }, { label: 'Contact', href: '/contact' }].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-body transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body font-bold text-sm tracking-wide mb-4" style={{ color: 'white' }}>Get in touch</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:soultailsinfo@gmail.com" className="flex items-start gap-2.5 text-sm font-body hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#C85B6E' }} />
                  soultailsinfo@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm font-body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#C85B6E' }} />
                London & surrounding areas
              </li>
              <li className="flex items-start gap-2.5 text-sm font-body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Clock size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#C85B6E' }} />
                Responds within 24 hours
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/book" className="btn-primary text-sm px-5 py-2.5 inline-flex">Book now</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-body" style={{ color: 'rgba(255,255,255,0.3)' }}>
            &copy; {new Date().getFullYear()} Soultails Veterinary Services · Dr. Claudia Fioravanti DVM MRCVS CertAVP ISFMAdvCerFB
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs font-body hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>Privacy</Link>
            <Link href="/terms" className="text-xs font-body hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>Terms</Link>
            <Link href="/admin/login" className="text-xs font-body hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
