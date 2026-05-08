import nextEnv from '@next/env'
import { createClient } from '@sanity/client'
import { services } from './sanity-content.mjs'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function run() {
  console.log('Syncing Sanity services...')

  for (const service of services) {
    await client.createOrReplace(service)
    console.log(`Synced ${service.name}`)
  }

  console.log('Sanity service sync complete.')
}

run().catch((error) => {
  console.error('Sanity sync failed:', error)
  process.exit(1)
})
