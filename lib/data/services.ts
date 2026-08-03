import { sanityClient } from '@/sanity/lib/client'
import type { IconName } from 'lucide-react/dynamic'

export type ServiceIconKey = IconName

export interface Service {
  id: string
  title: string
  eyebrow: string
  description: string
  tags: string[]
  icon: ServiceIconKey
  accent: string
  serviceOrder: number
  showOnHome: boolean
  homeOrder: number
}

const serviceProjection = `{
  "id": _id,
  title,
  "eyebrow": coalesce(eyebrow, "Engineering service"),
  description,
  "tags": coalesce(tags, []),
  "icon": coalesce(icon, "boxes"),
  "accent": coalesce(accent, "#45c9e8"),
  "serviceOrder": coalesce(serviceOrder, 9999),
  "showOnHome": coalesce(showOnHome, false),
  "homeOrder": coalesce(homeOrder, 9999)
}`

const allServicesQuery = `*[
  _type == "services" &&
  defined(title) &&
  defined(description)
] | order(coalesce(serviceOrder, 9999) asc, title asc) ${serviceProjection}`

const homeServicesQuery = `*[
  _type == "services" &&
  coalesce(showOnHome, false) == true &&
  defined(title) &&
  defined(description)
] | order(coalesce(homeOrder, 9999) asc, coalesce(serviceOrder, 9999) asc)[0...4] ${serviceProjection}`

/** Returns every published service for the Services page. */
export async function getAllServices(): Promise<Service[]> {
  try {
    const services = await sanityClient.fetch<Service[]>(allServicesQuery, {}, {
      next: { revalidate: 60 },
    })

    return services
  } catch (error) {
    console.warn('[Sanity] Could not load Services.', error)
    return []
  }
}

/** Returns only editor-selected Home services, constrained to four positions. */
export async function getHomeServices(): Promise<Service[]> {
  try {
    return await sanityClient.fetch<Service[]>(
      homeServicesQuery,
      {},
      { next: { revalidate: 60 } },
    )
  } catch (error) {
    console.warn('[Sanity] Could not load Home services.', error)
    return []
  }
}
