import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'soultails',
  title: 'Soultails CMS',
  projectId: 'eirs52gp',     // ✅ hardcode karo
  dataset: 'production',      // ✅ hardcode karo
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Soultails CMS')
          .items([
            S.listItem().title('Blog Posts').icon(()=>'✍️')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem().title('Services').icon(()=>'🐾')
              .child(S.documentTypeList('service').title('Services')),
            S.listItem().title('Site Settings').icon(()=>'⚙️')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})