import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, ArrowRight, GraduationCap } from "lucide-react"
import { getSiteSettings, urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { portableTextComponents } from "@/components/PortableTextRenderer"

export const revalidate = 60

export const metadata: Metadata = {
  title: "About Dr. Claudia Fioravanti",
  description: "Meet Dr. Claudia Fioravanti DVM MRCVS CertAVP ISFMAdvCerFB — expert integrative veterinary care with a special focus on feline behaviour and senior pets.",
}

const credentialFullNames: Record<string, string> = {
  DVM: "Doctor of Veterinary Medicine",
  MRCVS: "Member of the Royal College of Veterinary Surgeons",
  CertAVP: "Certificate in Advanced Veterinary Practice",
  ISFMAdvCerFB: "ISFM Advanced Certificate in Feline Behaviour",
}

const defaultValues = [
  { title: "Integrative approach", desc: "Combining conventional veterinary medicine with complementary therapies for whole-animal wellbeing." },
  { title: "Unhurried consultations", desc: "Every pet deserves time and attention. We never rush — your animal's comfort is the priority." },
  { title: "Evidence-based care", desc: "All recommendations are grounded in current research and clinical expertise." },
  { title: "Compassionate communication", desc: "Clear, honest guidance that empowers you to make the best decisions for your pet." },
]

export default async function AboutPage() {
  const settings = await getSiteSettings().catch(() => null)

  const doctorName = settings?.doctorName ?? "Dr. Claudia Fioravanti"
  const tagline = settings?.tagline ?? "Integrative veterinary expert dedicated to whole-animal health and wellbeing."
  const credentials: string[] = settings?.credentials ?? ["DVM", "MRCVS", "CertAVP", "ISFMAdvCerFB"]
  const values = settings?.aboutValues?.length > 0 ? settings.aboutValues : defaultValues
  const quote = settings?.quote ?? "My goal is to provide every animal with the most thoughtful, comprehensive care possible — treating not just the symptoms, but the whole being."

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-cream-dark">
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">About</div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-6">
              Meet Dr. Claudia<br /><span className="text-primary">Fioravanti</span>
            </h1>
            <p className="font-body text-lg text-brand-muted leading-relaxed">{tagline}</p>
          </div>
        </div>
      </section>

      {/* Bio section */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              {settings?.profileImage && (
                <div className="mb-8">
                  <div className="relative w-56 h-56 rounded-2xl overflow-hidden border-4 border-white shadow-card">
                    <Image
                      src={urlFor(settings.profileImage).width(500).height(500).fit("crop").url()}
                      alt={settings.profileImage.alt ?? doctorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="section-tag mb-4">Her story</div>
              <h2 className="font-heading text-3xl font-semibold text-brand-text mb-6">A passion for integrative care</h2>
              <div className="divider-copper mb-6" />
              <div className="font-body text-brand-muted leading-relaxed space-y-4 prose-sm">
                {settings?.bio ? (
                  <PortableText value={settings.bio} components={portableTextComponents} />
                ) : (
                  <>
                    <p>Soultails aims to bring a high quality veterinary service to the comfort of your home. We specifically wanted it to be targeted to your pet&apos;s needs and built it with their personality and desires in mind. This embraces a new fairer concept of contextualised veterinary care, with the pet and its family at the centre of it.</p>
                    <p>In our healing concept, family members also play an important role, and we will strive to guide you on the best route to keep your pet in full health for hopefully many years to come.</p>
                    <p>As such we love to use alternative treatment options to integrate western veterinary medicine with holistic treatments and techniques in a more rounded vision of veterinary medicine — including acupuncture, osteopathy, herbal medicine, essential oils, and nutritional therapy.</p>
                    <p>Dr. Claudia Fioravanti is a highly qualified veterinary surgeon with advanced certifications in feline behaviour and veterinary practice, serving South East London and part of Kent.</p>
                  </>
                )}
              </div>
              <div className="mt-8">
                <Link href="/book" className="btn-primary">Book a consultation <ArrowRight size={16} /></Link>
              </div>
            </div>

            {/* Credentials + Quote */}
            <div className="space-y-6">
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                    <GraduationCap size={18} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-brand-text">Qualifications</h3>
                </div>
                <div className="space-y-4">
                  {credentials.map((abbr: string) => (
                    <div key={abbr} className="flex items-start gap-3 pb-4 border-b border-linen last:border-0 last:pb-0">
                      <span className="font-body text-xs font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-md flex-shrink-0 mt-0.5">{abbr}</span>
                      <span className="font-body text-sm text-brand-muted leading-snug">
                        {credentialFullNames[abbr] ?? abbr}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-cream-dark rounded-xl p-6 border border-linen">
                <p className="font-body text-sm text-brand-muted leading-relaxed italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="font-body text-sm font-medium text-brand-text mt-3">— {doctorName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-cream-dark">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-tag mb-3 justify-center">My approach</div>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-text">The values behind the care</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v: any) => (
              <div key={v.title} className="card p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-brand-text mb-1">{v.title}</h3>
                    <p className="font-body text-sm text-brand-muted leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-white">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl font-semibold text-brand-text mb-4">Ready to work with Dr. Claudia?</h2>
          <p className="font-body text-brand-muted mb-8 max-w-lg mx-auto">
            {settings?.serviceArea
              ? `Remote consultations available across the UK. Home visits in ${settings.serviceArea}.`
              : "Remote consultations available across the UK. Home visits in London and surrounding areas."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/book" className="btn-primary px-8 py-3.5">Book a consultation <ArrowRight size={16} /></Link>
            <Link href="/services" className="btn-outline px-8 py-3.5">View services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
