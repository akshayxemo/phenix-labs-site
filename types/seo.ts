/**
 * SEO-related type definitions
 */

export interface OpenGraphImage {
  url: string
  width: number
  height: number
  alt: string
  type?: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
}

export interface TwitterCard {
  card: 'summary' | 'summary_large_image' | 'app' | 'player'
  site: string
  creator?: string
  title: string
  description: string
  image: string
}

export interface JsonLdSchema {
  '@context': string
  '@type': string
  [key: string]: unknown
}

export interface OrganizationSchema extends JsonLdSchema {
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  sameAs: string[]
  contactPoint: {
    '@type': 'ContactPoint'
    contactType: string
    email: string
    telephone: string
    availableLanguage: string
  }
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
}

export interface WebPageSchema extends JsonLdSchema {
  '@type': 'WebPage'
  name: string
  description: string
  url: string
  isPartOf: {
    '@type': 'WebSite'
    name: string
    url: string
  }
}

export interface BreadcrumbSchema extends JsonLdSchema {
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

export interface ServiceSchema extends JsonLdSchema {
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
    url: string
  }
  image?: string
}

export interface StructuredData {
  organization?: OrganizationSchema
  webpage?: WebPageSchema
  breadcrumbs?: BreadcrumbSchema
  services?: ServiceSchema[]
}
