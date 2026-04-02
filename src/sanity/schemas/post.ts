import { defineField, defineType } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name:'title', title:'Title', type:'string', validation:(R)=>R.required().min(10).max(100) }),
    defineField({ name:'slug', title:'URL Slug', type:'slug', options:{ source:'title', maxLength:96 }, validation:(R)=>R.required() }),
    defineField({ name:'excerpt', title:'Short Description', description:'Shown on listing page and in Google (max 160 chars)', type:'text', rows:3, validation:(R)=>R.required().max(160) }),
    defineField({
      name:'coverImage', title:'Cover Image', type:'image', options:{ hotspot:true },
      fields:[defineField({ name:'alt', title:'Alt text (describe the image)', type:'string', validation:(R)=>R.required() })],
      validation:(R)=>R.required(),
    }),
    defineField({
      name:'category', title:'Category', type:'string',
      options:{ list:[
        { title:'Feline Behaviour', value:'feline-behaviour' },
        { title:'Pain Management', value:'pain-management' },
        { title:'Nutrition & Integrative Care', value:'nutrition' },
        { title:'Senior Pet Care', value:'senior-pets' },
        { title:'Palliative Care', value:'palliative-care' },
        { title:'General Advice', value:'general' },
      ], layout:'dropdown' },
      validation:(R)=>R.required(),
    }),
    defineField({
      name:'body', title:'Blog Content', type:'array',
      of:[
        { type:'block', styles:[
            { title:'Normal', value:'normal' },
            { title:'Heading 2', value:'h2' },
            { title:'Heading 3', value:'h3' },
            { title:'Quote', value:'blockquote' },
          ],
          marks:{ decorators:[{ title:'Bold', value:'strong' },{ title:'Italic', value:'em' }] }
        },
        { type:'image', options:{ hotspot:true },
          fields:[
            defineField({ name:'alt', title:'Alt text', type:'string' }),
            defineField({ name:'caption', title:'Caption', type:'string' }),
          ]
        },
      ],
      validation:(R)=>R.required(),
    }),
    defineField({ name:'metaTitle', title:'SEO Title (optional)', description:'Leave blank to use post title', type:'string', validation:(R)=>R.max(60) }),
    defineField({ name:'metaDescription', title:'SEO Description (optional)', description:'Leave blank to use short description', type:'text', rows:2, validation:(R)=>R.max(160) }),
    defineField({ name:'publishedAt', title:'Publish Date', type:'datetime', initialValue:()=>new Date().toISOString() }),
    defineField({ name:'featured', title:'Feature on homepage?', type:'boolean', initialValue:false }),
  ],
  preview:{
    select:{ title:'title', category:'category', media:'coverImage' },
    prepare({ title, category, media }){ return { title, subtitle:category, media } },
  },
  orderings:[{ title:'Newest first', name:'publishedDesc', by:[{ field:'publishedAt', direction:'desc' }] }],
})
