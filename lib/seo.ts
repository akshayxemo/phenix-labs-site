import type { Metadata } from 'next'

const siteConfig = {
  name: 'Phenix Labs',
  description: 'Premium engineering company delivering innovative technology solutions',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://phenix-labs.com',
  ogImage: 'https://phenix-labs.com/og-image.jpg',
  twitter: '@phenixlabs',
  locale: 'en_US',
}

export interface SEOMetadata {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  keywords?: string[]
  author?: string
}

export function generateMetadata(params: SEOMetadata & { path?: string }): Metadata {
  const {
    title = siteConfig.name,
    description = siteConfig.description,
    canonicalUrl = siteConfig.url,
    ogImage = siteConfig.ogImage,
    ogType = 'website',
    keywords = [],
    path = '',
  } = params

  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`
  const url = `${siteConfig.url}${path}`

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, 'engineering', 'technology', 'innovation'],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: ogType,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

/**
 * JSON-LD Schema for Organization
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      'https://www.facebook.com/phenixlabs',
      'https://www.twitter.com/phenixlabs',
      'https://www.linkedin.com/company/phenixlabs',
      'https://www.instagram.com/phenixlabs',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'General Inquiry',
      email: 'hello@phenix-labs.com',
      telephone: '+1-234-567-890',
      availableLanguage: 'en',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Tech Street',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
  }
}

/**
 * JSON-LD Schema for WebPage
 */
export function getWebPageSchema(params: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: params.title,
    description: params.description,
    url: `${siteConfig.url}${params.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

/**
 * JSON-LD Schema for BreadcrumbList
 */
export function getBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * JSON-LD Schema for Service
 */
export function getServiceSchema(params: {
  name: string
  description: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(params.image && { image: params.image }),
  }
}

export const siteMetadata = siteConfig
