import { sanityClient } from '@/sanity/lib/client'

export interface ClientLogo {
  id: string
  name: string
  logoUrl: string
}

const clientsQuery = `*[
  _type == "clients" &&
  defined(name) &&
  defined(logo.asset)
] | order(_createdAt asc) {
  "id": _id,
  name,
  "logoUrl": logo.asset->url
}`

export async function getClients(): Promise<ClientLogo[]> {
  try {
    return await sanityClient.fetch<ClientLogo[]>(clientsQuery, {}, {
      next: { revalidate: 60 },
    })
  } catch (error) {
    console.warn('[Sanity] Could not load clients.', error)
    return []
  }
}
