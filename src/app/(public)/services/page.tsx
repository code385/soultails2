import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Video, Home, Heart, Leaf, Activity, Star } from 'lucide-react'
import { getAllServices } from '@/lib/sanity'
import { STATIC_SERVICES } from '@/lib/staticData'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Veterinary Services',
  description: 'Expert integrative veterinary services — remote consultations and home visits. Feline behaviour, chronic pain, palliative care, senior pets, nutrition.',
}

const iconMap: Record<string, any> = { Video, Home, Heart, Leaf, Activity, Cat: Heart, Star }

export default async function ServicesPage() {
  const sanityServices = await getAllServices().catch(() => [])
  const services = sanityServices.length > 0 ? sanityServices : STATIC_SERVICES

  return (
    <>
      <section className="pt-28 pb-16" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="section-tag mb-4">What we offer</div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-6">Our services</h1>
            <p className="font-body text-lg text-brand-muted leading-relaxed">
              Expert integrative veterinary care — tailored to your pet&apos;s individual needs, delivered in your home or online.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s: any) => {
              const Icon = iconMap[s.icon] ?? Heart
              return (
                <Link key={s.slug} href={`/services/${s.slug}`}
                  className="card p-6 lg:p-7 group block flex flex-col hover:shadow-card-hover transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-110"
                    style={{ background: 'var(--color-primary-light)' }}>
                    <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">{s.name}</h2>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-5 flex-1">{s.shortDescription}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-linen">
                    <div>
                      {s.serviceMode === 'both' && s.remotePrice && s.homeVisitPrice ? (
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-body text-xs text-brand-subtle">Remote</span>
                            <span className="font-body text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{s.remotePrice}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-body text-xs text-brand-subtle">Home visit</span>
                            <span className="font-body text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{s.homeVisitPrice}</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          {s.priceDisplay && <span className="font-body text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{s.priceDisplay}</span>}
                          <div className="font-body text-xs text-brand-subtle mt-0.5">
                            {s.serviceMode === 'home_visit' ? 'Home visit' : 'Remote'}
                          </div>
                        </>
                      )}
                    </div>
                    <span className="w-8 h-8 rounded-full border border-linen flex items-center justify-center group-hover:border-primary transition-colors">
                      <ArrowRight size={14} className="text-brand-subtle group-hover:text-primary transition-colors" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cta-gradient py-16">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl font-semibold text-white mb-4">Not sure which service you need?</h2>
          <p className="font-body mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>Send us a message and we&apos;ll help you find the right care for your pet.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-body font-bold text-sm rounded-full hover:bg-cream transition-all"
            style={{ color: 'var(--color-primary)' }}>
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
