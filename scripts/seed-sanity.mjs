import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'eirs52gp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skk9El9fubdmqF4D2fDi1oStcHWtSqiQZ2WJFjuaDexy0GQ0wIo2Gnp8MdQzuEz3JuwsKhoy4gtdEaZ94rGhuskqL826rpwAFieOmwHGgD5y2vpIfSmjSc0tVZrIBIdJelFyhkTSllmNc8pkFLBfdPiQueMgQmxxmV2lzSEEZLZnKzZEHP08',
  useCdn: false,
})

const services = [
  {
    _type: 'service',
    _id: 'service-home-visit',
    name: 'Home Visit Consultation',
    slug: { _type: 'slug', current: 'home-visit' },
    shortDescription: 'Dr. Claudia comes to you — expert integrative veterinary care in the comfort of your home. Available 10am to 4pm in South East London and part of Kent.',
    fullDescription: [
      { _type: 'block', _key: 'hv1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'hv1s', text: 'Soultails brings a high quality veterinary service to the comfort of your home. We specifically wanted it to be targeted to your pet\'s needs and built it with their personality and desires in mind. This embraces a new fairer concept of contextualised veterinary care, with the pet and its family at the centre of it.' }] },
      { _type: 'block', _key: 'hv2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'hv2s', text: 'Most visits last between 30 to 40 minutes, though it is best to allow up to an hour — as we work in cats and dogs\' timings: at their own pace! We can give you a half hour arrival window.' }] },
      { _type: 'block', _key: 'hv3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'hv3s', text: 'Payment is taken prior to appointments exclusively via payment link. The receipt of payment is confirmation of the booked appointment.' }] },
    ],
    icon: 'Home',
    serviceMode: 'home_visit',
    priceDisplay: '£130',
    duration: '30–60 minutes',
    whatToExpect: [
      'Half hour arrival window provided',
      'Full clinical assessment in your pet\'s familiar environment',
      'Physical examinations and treatments',
      'Herbal medicine, essential oils, osteopathy and acupuncture as appropriate',
      'Secure payment link sent prior to appointment',
    ],
    order: 1,
    featured: true,
    metaDescription: 'Vet home visit in South East London and Kent by Dr. Claudia Fioravanti DVM MRCVS. Expert integrative veterinary care at home. £130 per visit.',
  },
  {
    _type: 'service',
    _id: 'service-remote-consultation',
    name: 'Remote Consultation (Zoom)',
    slug: { _type: 'slug', current: 'remote-consultation' },
    shortDescription: 'Expert veterinary advice via secure Zoom video call — no travel stress for you or your pet. Up to 30 minutes.',
    fullDescription: [
      { _type: 'block', _key: 'rc1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'rc1s', text: 'Depending on your pet\'s condition, we are often able to offer remote appointments via Zoom meeting. These are ideal for follow-up appointments, second opinions, behaviour assessments, and non-emergency concerns.' }] },
      { _type: 'block', _key: 'rc2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'rc2s', text: 'Before your appointment, you\'ll receive a secure Zoom link. Dr. Claudia will take the time to listen, observe your pet through video, and provide a thorough assessment combining conventional and integrative approaches.' }] },
      { _type: 'block', _key: 'rc3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'rc3s', text: 'Remote follow-up appointments are also available at a reduced rate of £50.' }] },
    ],
    icon: 'Video',
    serviceMode: 'remote',
    priceDisplay: '£90',
    duration: 'Up to 30 minutes',
    whatToExpect: [
      'Secure Zoom video link sent to your email',
      'Thorough history taking and visual assessment',
      'Evidence-based recommendations combining conventional and integrative approaches',
      'Follow-up appointments available at £50',
      'Prescription referrals arranged with your local vet if needed',
    ],
    order: 2,
    featured: true,
    metaDescription: 'Online veterinary consultation with Dr. Claudia Fioravanti DVM MRCVS. Expert integrative care via Zoom. £90 per session.',
  },
  {
    _type: 'service',
    _id: 'service-feline-behaviour',
    name: 'Feline Behaviour Consultation',
    slug: { _type: 'slug', current: 'feline-behaviour' },
    shortDescription: 'Expert cat behaviour assessment by an ISFMAdvCerFB-certified professional. Requires a behaviour questionnaire completed in advance.',
    fullDescription: [
      { _type: 'block', _key: 'fb1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'fb1s', text: 'Dr. Claudia Fioravanti holds the ISFM Advanced Certificate in Feline Behaviour — one of the highest qualifications available in this specialist field.' }] },
      { _type: 'block', _key: 'fb2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'fb2s', text: 'Feline behaviour consultations can be particularly lengthy. We require you to fill in a behaviour questionnaire in advance and to allow us to study all the details of your concerns before the appointment.' }] },
      { _type: 'block', _key: 'fb3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'fb3s', text: 'Available as both remote consultations and home visits. Home visits are particularly valuable as they allow observation of the cat in their own environment.' }] },
    ],
    icon: 'Heart',
    serviceMode: 'both',
    priceDisplay: 'From £90',
    remotePrice: '£90',
    homeVisitPrice: '£130',
    duration: '60–90 minutes',
    whatToExpect: [
      'Behaviour questionnaire sent before appointment — please complete in full',
      'Full environmental and lifestyle assessment',
      'Expert analysis of triggers and underlying causes',
      'Personalised behaviour modification plan',
      'Ongoing support and follow-up available',
    ],
    order: 3,
    featured: true,
    metaDescription: 'Cat behaviour expert consultation UK — Dr. Claudia Fioravanti ISFMAdvCerFB. Remote and home visit feline behaviour assessments.',
  },
  {
    _type: 'service',
    _id: 'service-chronic-pain',
    name: 'Chronic Pain Management',
    slug: { _type: 'slug', current: 'chronic-pain-management' },
    shortDescription: 'Integrative approach to chronic and acute pain — combining conventional medicine with acupuncture, osteopathy, massage and herbal therapies.',
    fullDescription: [
      { _type: 'block', _key: 'cp1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'cp1s', text: 'Chronic pain is one of the most under-recognised conditions in companion animals. Dr. Claudia has specialist expertise in identifying and managing both chronic and acute pain using an integrative approach.' }] },
      { _type: 'block', _key: 'cp2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'cp2s', text: 'Her approach combines thorough pain assessment with multimodal management strategies, which may include conventional analgesics alongside acupuncture, osteopathy, massage therapies, herbal medicine, essential oils, and nutritional support.' }] },
      { _type: 'block', _key: 'cp3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'cp3s', text: 'Monthly consultations are often needed for certain pain relief modalities to maintain effectiveness and adjust the treatment plan as your pet\'s needs evolve.' }] },
    ],
    icon: 'Activity',
    serviceMode: 'both',
    priceDisplay: 'From £90',
    remotePrice: '£90',
    homeVisitPrice: '£130',
    duration: '45–60 minutes',
    whatToExpect: [
      'Comprehensive pain scoring and assessment',
      'Multimodal pain management plan tailored to your pet',
      'Acupuncture, osteopathy and massage as appropriate',
      'Herbal medicine and essential oils where beneficial',
      'Monthly follow-ups often recommended',
    ],
    order: 4,
    featured: true,
    metaDescription: 'Chronic pain management for pets by Dr. Claudia Fioravanti DVM MRCVS. Integrative approach combining conventional and complementary therapies.',
  },
  {
    _type: 'service',
    _id: 'service-puppy-kitten',
    name: 'Puppy & Kitten Consultations',
    slug: { _type: 'slug', current: 'puppy-kitten-consultations' },
    shortDescription: 'Give your new companion the best possible start — preventative care, nutrition guidance and health checks tailored to puppies and kittens.',
    fullDescription: [
      { _type: 'block', _key: 'pk1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'pk1s', text: 'The early months of a puppy or kitten\'s life are crucial for their long-term health and wellbeing. Dr. Claudia offers integrative new pet consultations that go beyond the standard health check.' }] },
      { _type: 'block', _key: 'pk2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'pk2s', text: 'We cover vaccination protocols, parasite prevention, nutrition and diet planning, socialisation guidance, and early behaviour foundations — all tailored to your pet\'s individual needs and lifestyle.' }] },
      { _type: 'block', _key: 'pk3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'pk3s', text: 'Preventative care is tailored depending on your pet\'s age and lifestyle, helping to build strong foundations for a long and healthy life.' }] },
    ],
    icon: 'Star',
    serviceMode: 'both',
    priceDisplay: 'From £90',
    remotePrice: '£90',
    homeVisitPrice: '£130',
    duration: '45–60 minutes',
    whatToExpect: [
      'Full health assessment appropriate to age',
      'Vaccination and parasite prevention guidance',
      'Tailored nutrition and diet recommendations',
      'Socialisation and early behaviour advice',
      'Preventative care plan for the months ahead',
    ],
    order: 5,
    featured: false,
    metaDescription: 'Puppy and kitten consultations by Dr. Claudia Fioravanti DVM MRCVS. Integrative new pet health checks in South East London and online.',
  },
  {
    _type: 'service',
    _id: 'service-acupuncture',
    name: 'Acupuncture & Osteopathy',
    slug: { _type: 'slug', current: 'acupuncture-osteopathy' },
    shortDescription: 'Evidence-based complementary therapies — acupuncture, osteopathy and massage — used alongside conventional medicine for whole-animal wellbeing.',
    fullDescription: [
      { _type: 'block', _key: 'ao1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ao1s', text: 'Dr. Claudia integrates acupuncture, osteopathy and massage therapies into her veterinary practice as evidence-based tools to support healing and improve quality of life.' }] },
      { _type: 'block', _key: 'ao2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ao2s', text: 'Acupuncture can be particularly effective for pain management, musculoskeletal conditions, neurological support, and post-operative recovery. Osteopathy and massage help restore mobility and reduce tension.' }] },
      { _type: 'block', _key: 'ao3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ao3s', text: 'These therapies are always used alongside — never instead of — conventional veterinary medicine, as part of a comprehensive, individualised treatment plan.' }] },
    ],
    icon: 'Leaf',
    serviceMode: 'home_visit',
    priceDisplay: '£130',
    duration: '30–60 minutes',
    whatToExpect: [
      'Assessment to determine suitability for complementary therapies',
      'Acupuncture using sterile single-use needles',
      'Osteopathy and massage as appropriate',
      'Integration with your pet\'s existing treatment plan',
      'Regular sessions often recommended for best results',
    ],
    order: 6,
    featured: false,
    metaDescription: 'Veterinary acupuncture and osteopathy for pets by Dr. Claudia Fioravanti DVM MRCVS. Home visits in South East London and Kent.',
  },
  {
    _type: 'service',
    _id: 'service-nutrition',
    name: 'Nutrition & Herbal Medicine',
    slug: { _type: 'slug', current: 'nutrition-integrative' },
    shortDescription: 'Personalised nutrition plans, herbal medicine, essential oils and supplements — evidence-based integrative care for whole-animal health.',
    fullDescription: [
      { _type: 'block', _key: 'nh1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'nh1s', text: 'Nutrition is the foundation of health, yet it is often overlooked in conventional veterinary practice. Dr. Claudia takes a deep dive into your pet\'s diet and nutritional status, identifying deficiencies or imbalances that may be contributing to health issues.' }] },
      { _type: 'block', _key: 'nh2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'nh2s', text: 'Her integrative approach also encompasses herbal medicine, essential oils treatment, and nutraceuticals — all selected based on current evidence and your pet\'s individual needs.' }] },
      { _type: 'block', _key: 'nh3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'nh3s', text: 'Monthly consultations are often needed for nutrition health checks to monitor progress and adjust recommendations as your pet\'s condition evolves.' }] },
    ],
    icon: 'Leaf',
    serviceMode: 'both',
    priceDisplay: 'From £90',
    remotePrice: '£90',
    homeVisitPrice: '£130',
    duration: '45–60 minutes',
    whatToExpect: [
      'Detailed dietary history and nutritional assessment',
      'Personalised nutrition plan tailored to your pet',
      'Herbal medicine and supplement recommendations',
      'Essential oils guidance where appropriate',
      'Monthly check-ins available for ongoing conditions',
    ],
    order: 7,
    featured: false,
    metaDescription: 'Pet nutrition and herbal medicine by Dr. Claudia Fioravanti DVM MRCVS. Integrative approach for cats and dogs in South East London and online.',
  },
  {
    _type: 'service',
    _id: 'service-palliative',
    name: 'Palliative & Senior Pet Care',
    slug: { _type: 'slug', current: 'palliative-care' },
    shortDescription: 'Compassionate, dignified care for elderly and end-of-life pets — focusing on comfort, quality of life and support for the whole family.',
    fullDescription: [
      { _type: 'block', _key: 'ps1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ps1s', text: 'When a beloved pet reaches the end of their life, the focus shifts to comfort, dignity, and quality of life. Dr. Claudia provides compassionate palliative care that supports both the animal and the entire family through this difficult time.' }] },
      { _type: 'block', _key: 'ps2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ps2s', text: 'For senior pets, Dr. Claudia offers comprehensive health assessments taking a whole-body approach — considering physical signs of ageing, cognitive function, emotional wellbeing, and environmental factors.' }] },
      { _type: 'block', _key: 'ps3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ps3s', text: 'Preventative care is tailored depending on your pet\'s age and lifestyle, helping to maintain quality of life for as long as possible.' }] },
    ],
    icon: 'Heart',
    serviceMode: 'both',
    priceDisplay: 'Contact for pricing',
    duration: 'As needed',
    whatToExpect: [
      'Compassionate, unhurried assessment',
      'Personalised comfort and senior care plan',
      'Pain and symptom management',
      'Preventative care tailored to age and lifestyle',
      'Honest, sensitive guidance on quality of life',
    ],
    order: 8,
    featured: false,
    metaDescription: 'Palliative and senior pet care by Dr. Claudia Fioravanti DVM MRCVS. Compassionate home visit service in South East London and Kent.',
  },
]

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  doctorName: 'Dr. Claudia Fioravanti',
  tagline: 'Bringing high quality veterinary care to the comfort of your home',
  bio: [
    { _type: 'block', _key: 'bio1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'bio1s', text: 'Soultails aims to bring a high quality veterinary service to the comfort of your home. We specifically wanted it to be targeted to your pet\'s needs and built it with their personality and desires in mind. This embraces a new fairer concept of contextualised veterinary care, with the pet and its family at the centre of it.' }] },
    { _type: 'block', _key: 'bio2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'bio2s', text: 'In our healing concept, family members also play an important role, and we will strive to guide you on the best route to keep your pet in full health for hopefully many years to come.' }] },
    { _type: 'block', _key: 'bio3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'bio3s', text: 'As such we love to use alternative treatment options to integrate western veterinary medicine with holistic treatments and techniques in a more rounded vision of veterinary medicine — including acupuncture, osteopathy, herbal medicine, essential oils, and nutritional therapy.' }] },
    { _type: 'block', _key: 'bio4', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'bio4s', text: 'Dr. Claudia Fioravanti is a highly qualified veterinary surgeon with advanced certifications in feline behaviour and veterinary practice, serving South East London and part of Kent.' }] },
  ],
  credentials: ['DVM', 'MRCVS', 'CertAVP', 'ISFMAdvCerFB'],
  email: 'soultailsinfo@gmail.com',
  serviceArea: 'South East London & part of Kent',
  quote: 'My goal is to provide every animal with the most thoughtful, comprehensive care possible — treating not just the symptoms, but the whole being.',
  aboutValues: [
    { _type: 'object', _key: 'val1', title: 'Integrative approach', desc: 'Combining conventional veterinary medicine with complementary therapies for whole-animal wellbeing.' },
    { _type: 'object', _key: 'val2', title: 'Unhurried consultations', desc: 'Every pet deserves time and attention. We never rush — your animal\'s comfort is the priority.' },
    { _type: 'object', _key: 'val3', title: 'Evidence-based care', desc: 'All recommendations are grounded in current research and clinical expertise.' },
    { _type: 'object', _key: 'val4', title: 'Compassionate communication', desc: 'Clear, honest guidance that empowers you to make the best decisions for your pet.' },
  ],
}

async function seed() {
  console.log('🌱 Seeding Sanity...\n')

  // Site Settings
  console.log('⚙️  Uploading Site Settings...')
  await client.createOrReplace(siteSettings)
  console.log('✅ Site Settings done\n')

  // Services
  console.log('🐾 Uploading Services...')
  for (const service of services) {
    await client.createOrReplace(service)
    console.log(`   ✅ ${service.name}`)
  }

  console.log('\n🎉 All done! Sanity is seeded.')
  console.log('👉 Visit https://soultails.sanity.studio to verify')
}

seed().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
