/**
 * SEO Configuration and constants
 */

export const SEO_CONFIG = {
  // Site metadata
  siteName: 'Phenix Labs',
  siteDescription: 'Premium engineering company delivering innovative technology solutions',
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://phenix-labs.com',
  siteImage: 'https://phenix-labs.com/og-image.jpg',
  
  // Company information
  company: {
    name: 'Phenix Labs',
    email: 'gyankrishna@phenixlabs.in',
    phone: '+91 89615 48205',
    address: {
      street: 'TC 6/215/NLRA 135, Neerazhi Line, Ulloor',
      city: 'Thiruvananthapuram',
      state: 'Kerala',
      zip: '695011',
      country: 'IN',
    },
  },
  
  // Social media
  social: {
    twitter: '@phenixlabs',
    facebook: 'https://www.facebook.com/phenixlabs',
    linkedin: 'https://www.linkedin.com/company/phenixlabs',
    instagram: 'https://www.instagram.com/phenixlabs',
  },
  
  // Default keywords
  defaultKeywords: [
    'engineering',
    'technology',
    'innovation',
    'web development',
    'UI design',
    'AI development',
    'creative solutions',
  ],
  
  // Page-specific metadata
  pages: {
    home: {
      title: 'Premium Engineering Solutions',
      description: 'Join Phenix Labs, a cutting-edge creative company transforming dreams into reality. Experience technology-led innovation.',
      path: '/',
    },
    services: {
      title: 'Our Services',
      description: 'Explore our comprehensive range of engineering and technology services designed to transform your business.',
      path: '/services',
    },
    about: {
      title: 'About Us',
      description: 'Learn about Phenix Labs, our mission, team, and commitment to delivering innovative solutions.',
      path: '/about',
    },
    cases: {
      title: 'Case Studies',
      description: 'Discover how we have helped businesses transform through innovative technology solutions.',
      path: '/products',
    },
    contact: {
      title: 'Get In Touch',
      description: 'Contact Phenix Labs for inquiries, project discussions, or partnership opportunities.',
      path: '/contact',
    },
  },
  
  // Locale
  locale: 'en_US',
  alternateLocales: ['en_GB'],
  
  // OpenGraph defaults
  openGraph: {
    type: 'website',
    width: 1200,
    height: 630,
  },
  
  // Twitter Card defaults
  twitterCard: 'summary_large_image',
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  
  // Canonical URL strategy
  useCanonicalUrl: true,
  
  // Sitemap
  sitemap: {
    enabled: true,
    path: '/sitemap.xml',
  },
}

/**
 * Heading hierarchy for semantic HTML
 */
export const HEADING_HIERARCHY = {
  page: 'h1',
  section: 'h2',
  subsection: 'h3',
  subsection2: 'h4',
} as const

/**
 * ARIA roles reference
 */
export const ARIA_ROLES = {
  navigation: 'navigation',
  main: 'main',
  contentinfo: 'contentinfo',
  region: 'region',
  banner: 'banner',
  complementary: 'complementary',
  form: 'form',
} as const

/**
 * Image optimization settings
 */
export const IMAGE_CONFIG = {
  formats: ['webp', 'avif'],
  sizes: {
    mobile: 640,
    tablet: 1024,
    desktop: 1440,
  },
  quality: 85,
  lazyLoad: {
    enabled: true,
    threshold: 0.1,
    rootMargin: '50px',
  },
}
