import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Video, Home, Heart, Leaf, Activity } from 'lucide-react'
import { Metadata } from 'next'
import { STATIC_SERVICES, STATIC_POSTS, SITE_SETTINGS } from '@/lib/staticData'
import { getFeaturedServices, getFeaturedPosts, getAllPosts, getSiteSettings } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Soultails | Expert Integrative Veterinary Care UK',
  description: 'Expert integrative veterinary care for cats, dogs and senior pets. Home visits and remote consultations across the UK by Dr. Claudia Fioravanti DVM MRCVS.',
}

const iconMap: Record<string, any> = { Video, Home, Heart, Leaf, Activity, Cat: Heart, Star }

const features = [
  'Compassionate, unhurried consultations',
  'Integrative & conventional medicine combined',
  'Feline behaviour expertise — ISFMAdvCerFB',
  'Home visits & remote consultations',
  'Senior & palliative care focus',
  'Evidence-based holistic approach',
]

export default async function HomePage() {
  const [sanityServices, sanityFeaturedPosts, sanityAllPosts, settings] = await Promise.all([
    getFeaturedServices().catch(() => []),
    getFeaturedPosts().catch(() => []),
    getAllPosts().catch(() => []),
    getSiteSettings().catch(() => null),
  ])

  const featuredServices = sanityServices.length > 0 ? sanityServices : STATIC_SERVICES.slice(0, 6)
  // Featured posts pehle, nahi hain toh latest 3, nahi hain toh static
  const featuredPosts = sanityFeaturedPosts.length > 0
    ? sanityFeaturedPosts
    : sanityAllPosts.length > 0
      ? sanityAllPosts.slice(0, 3)
      : STATIC_POSTS.filter(p => p.featured).slice(0, 3)
  const doctorName = settings?.doctorName ?? SITE_SETTINGS.doctorName
  const credentials = settings?.credentials ?? SITE_SETTINGS.credentials

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 80% 20%, #F5EDF9 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #FCEEF1 0%, transparent 60%)' }} />
        <div className="container-site relative z-10 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <div className="section-tag mb-6">
                <span className="tag-dot" />
                Expert Integrative Veterinary Care
              </div>
              <h1 className="font-heading font-bold text-brand-text leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.4rem,5vw,3.75rem)' }}>
                Veterinary care that treats the{' '}
                <em className="not-italic text-gradient">whole</em> animal
              </h1>
              <p className="font-body text-lg text-brand-muted leading-relaxed mb-8">
                Integrative, compassionate veterinary care for cats, dogs and senior pets — in your home and online, across the UK.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/book" className="btn-primary px-7 py-3.5 text-base gap-2.5">
                  Book a consultation <ArrowRight size={16} />
                </Link>
                <Link href="/services" className="btn-outline px-7 py-3.5 text-base">Our services</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {credentials.map((c: string) => (
                  <span key={c} className="font-body text-xs font-semibold px-3 py-1.5 bg-white border border-linen rounded-full text-brand-muted">{c}</span>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="relative hidden lg:block">
              <div className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary-light)' }}>
                    <span className="font-heading text-xl font-bold" style={{ color: 'var(--color-primary)' }}>CF</span>
                  </div>
                  <div>
                    <div className="font-heading text-lg font-semibold text-brand-text">{doctorName}</div>
                    <div className="font-body text-sm text-brand-muted">{credentials.join(' · ')}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {features.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                      <span className="font-body text-sm text-brand-muted">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-linen flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: 'var(--color-primary-light)' }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} style={{ color: '#B784C4', fill: '#B784C4' }} />)}
                  </div>
                  <span className="font-body text-xs text-brand-subtle">Trusted across the UK</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 text-white rounded-xl px-4 py-3 shadow-card-hover" style={{ background: 'linear-gradient(135deg,#C85B6E,#B784C4)' }}>
                <div className="font-body text-xs font-medium opacity-80">Available</div>
                <div className="font-heading text-sm font-semibold">Remote & Home visits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="text-center mb-14">
            <div className="section-tag mb-4 justify-center">Simple process</div>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-text mb-4">How it works</h2>
            <div className="divider-brand mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose your service', desc: 'Browse our services and select what best fits your pet\'s needs — remote or home visit.' },
              { step: '02', title: 'Book & confirm', desc: 'Fill in your booking form. Remote consultations are confirmed instantly after payment.' },
              { step: '03', title: 'Receive expert care', desc: 'Connect via Zoom or welcome Dr. Claudia to your home — compassionate care begins.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-light)' }}>
                  <span className="font-body text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{step}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-brand-text mb-2">{title}</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="section-tag mb-3">What we offer</div>
              <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-text">Our services</h2>
            </div>
            <Link href="/services" className="btn-outline text-sm px-5 py-2.5 self-start sm:self-auto">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((s: any) => {
              const Icon = iconMap[s.icon] ?? Heart
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card p-6 group block">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110"
                    style={{ background: 'var(--color-primary-light)' }}>
                    <Icon size={18} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-4">{s.shortDescription}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-linen">
                    <div>
                      {s.priceDisplay && <span className="font-body text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{s.priceDisplay}</span>}
                      <div className="font-body text-xs text-brand-subtle mt-0.5">
                        {s.serviceMode === 'home_visit' ? 'Home visit' : s.serviceMode === 'both' ? 'Remote & home' : 'Remote'}
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-full border border-linen flex items-center justify-center transition-all duration-200 group-hover:border-primary"
                      style={{ '--tw-border-opacity': '1' } as any}>
                      <ArrowRight size={14} className="text-brand-subtle group-hover:text-primary transition-colors" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-gradient py-16">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-white mb-4">Ready to get expert care for your pet?</h2>
          <p className="font-body text-lg mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>Remote consultations available across the UK. Home visits in London and surrounding areas.</p>
          <Link href="/book" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-body font-bold text-sm rounded-full hover:bg-cream transition-all duration-200 active:scale-[0.98]"
            style={{ color: 'var(--color-primary)' }}>
            Book your consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* BLOG */}
      {featuredPosts.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-site">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className="section-tag mb-3">Resources</div>
                <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-text">Latest from the blog</h2>
              </div>
              <Link href="/blog" className="btn-outline text-sm px-5 py-2.5 self-start sm:self-auto">
                All articles <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((p: any) => {
                const slug = p.slug?.current ?? p.slug
                return (
                  <Link key={p._id ?? p.slug} href={`/blog/${slug}`} className="card overflow-hidden group block">
                    <div className="h-44 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg,#FCEEF1,#F5EDF9)' }}>
                      {p.coverImage
                        ? <img src={urlFor(p.coverImage).width(600).height(176).url()} alt={p.coverImage.alt ?? p.title} className="w-full h-full object-cover" />
                        : <span className="text-4xl">🐾</span>
                      }
                    </div>
                    <div className="p-5">
                      <span className="font-body text-xs font-bold mb-2 block capitalize" style={{ color: 'var(--color-primary)' }}>
                        {p.category?.replace(/-/g, ' ')}
                      </span>
                      <h3 className="font-heading text-lg font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                      <p className="font-body text-sm text-brand-muted line-clamp-2 mb-3">{p.excerpt}</p>
                      <span className="font-body text-xs text-brand-subtle">{new Date(p.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
