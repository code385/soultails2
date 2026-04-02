import { defineField, defineType } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name:'name', title:'Service Name', type:'string', validation:(R)=>R.required() }),
    defineField({ name:'slug', title:'URL Slug', type:'slug', options:{ source:'name' }, validation:(R)=>R.required() }),
    defineField({ name:'shortDescription', title:'Short Description (card)', type:'text', rows:2, validation:(R)=>R.required().max(200) }),
    defineField({ name:'fullDescription', title:'Full Description (service page)', type:'array', of:[{ type:'block' }], validation:(R)=>R.required() }),
    defineField({ name:'icon', title:'Icon (lucide name)', type:'string', description:'e.g. Heart, Home, Video, Leaf, Cat, Activity' }),
    defineField({ name:'serviceMode', title:'Service Mode', type:'string', options:{ list:[{ title:'Remote / Online', value:'remote' },{ title:'Home Visit', value:'home_visit' },{ title:'Both', value:'both' }] }, validation:(R)=>R.required() }),
    defineField({ name:'priceDisplay', title:'Price Display', type:'string', description:'e.g. "From £120" or "Contact for pricing"' }),
    defineField({ name:'duration', title:'Session Duration', type:'string', description:'e.g. "60 minutes"' }),
    defineField({ name:'whatToExpect', title:'What to Expect', description:'Add each bullet point separately', type:'array', of:[{ type:'string' }] }),
    defineField({ name:'order', title:'Display Order', type:'number', initialValue:99 }),
    defineField({ name:'featured', title:'Show on Homepage', type:'boolean', initialValue:true }),
    defineField({ name:'metaDescription', title:'SEO Description', type:'text', rows:2, validation:(R)=>R.max(160) }),
  ],
  preview:{ select:{ title:'name', subtitle:'serviceMode' } },
  orderings:[{ title:'Display Order', name:'orderAsc', by:[{ field:'order', direction:'asc' }] }],
})

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name:'doctorName', title:"Doctor's Name", type:'string', initialValue:'Dr. Claudia Fioravanti' }),
    defineField({ name:'tagline', title:'Site Tagline', type:'string' }),
    defineField({ name:'bio', title:'About / Bio', type:'array', of:[{ type:'block' }] }),
    defineField({ name:'profileImage', title:'Profile Photo', type:'image', options:{ hotspot:true } }),
    defineField({ name:'credentials', title:'Credentials', type:'array', of:[{ type:'string' }], description:'e.g. DVM, MRCVS, CertAVP' }),
    defineField({ name:'phone', title:'Phone', type:'string' }),
    defineField({ name:'email', title:'Public Email', type:'string' }),
    defineField({ name:'serviceArea', title:'Service Area', type:'string', description:'e.g. London & surrounding areas' }),
    defineField({ name:'instagram', title:'Instagram URL', type:'url' }),
    defineField({ name:'linkedin', title:'LinkedIn URL', type:'url' }),
    defineField({ name:'facebook', title:'Facebook URL', type:'url' }),
  ],
  preview:{ prepare:()=>({ title:'Site Settings' }) },
})
