import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const upcomingReleases = [
  {
    _type: 'product',
    name: 'Calor Hybrid',
    status: 'upcoming',
    badge: 'Solar Tech',
    releaseDateText: 'Eco-friendly solar heat pump. Coming Q4 2026.',
    slug: { _type: 'slug', current: 'calor-hybrid' }
  },
  {
    _type: 'product',
    name: 'Calor Ultra',
    status: 'upcoming',
    badge: 'Industrial',
    releaseDateText: 'Continuous belt dehydrator. Coming 2027.',
    slug: { _type: 'slug', current: 'calor-ultra' }
  },
  {
    _type: 'product',
    name: 'Calor Nano',
    status: 'upcoming',
    badge: 'Botanical',
    releaseDateText: 'Microscale precision dryer. Coming Q1 2027.',
    slug: { _type: 'slug', current: 'calor-nano' }
  }
]

async function run() {
  try {
    console.log('Creating upcoming products in Sanity...')
    for (const product of upcomingReleases) {
      const res = await client.create(product)
      console.log(`Created ${product.name} with document ID: ${res._id}`)
    }
    console.log('Success!')
  } catch (err) {
    console.error('Error creating products:', err)
  }
}

run()
