export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['VeterinaryOrganization', 'LocalBusiness'],
    name: 'Soultails Veterinary Care',
    description: 'Expert integrative veterinary care for cats, dogs and senior pets. Home visits and remote consultations across the UK.',
    url: 'https://soultails.com',
    email: 'hello@soultails.com',
    areaServed: {
      '@type': 'Place',
      name: 'United Kingdom',
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Claudia Fioravanti',
      jobTitle: 'Veterinary Surgeon',
      description: 'DVM MRCVS CertAVP ISFMAdvCerFB — Expert integrative veterinary care',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Veterinary Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remote Veterinary Consultation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Visit Veterinary Care' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Feline Behaviour Consultation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chronic Pain Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Palliative & End-of-Life Care' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Senior Pet Care' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nutrition & Integrative Care' } },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BlogPostSchema({ title, excerpt, publishedAt, slug }: {
  title: string
  excerpt: string
  publishedAt: string
  slug: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
    url: `https://soultails.com/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: 'Dr. Claudia Fioravanti',
      url: 'https://soultails.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soultails Veterinary Care',
      url: 'https://soultails.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
