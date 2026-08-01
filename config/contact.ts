import { SEO_CONFIG } from '@/config/seo'

export const CONTACT_DETAILS = {
  phone: '+91 89615 48205',
  phoneHref: 'tel:+918961548205',
  email: 'gyankrishna@phenixlabs.in',
  emailHref: 'mailto:gyankrishna@phenixlabs.in',
  hours: 'Monday–Friday · 08:00–17:00',
  responseTime: 'Usually within one business day',
  address: 'TC 6/215/NLRA 135, Neerazhi Line, Ulloor, Thiruvananthapuram 695011',
} as const

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: SEO_CONFIG.social.instagram },
  { label: 'LinkedIn', href: SEO_CONFIG.social.linkedin },
  { label: 'Facebook', href: SEO_CONFIG.social.facebook },
  {
    label: 'Twitter',
    href: `https://twitter.com/${SEO_CONFIG.social.twitter.replace('@', '')}`,
  },
] as const
