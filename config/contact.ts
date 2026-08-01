import { SEO_CONFIG } from '@/config/seo'
import type { ContactSettings } from '@/types'

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  phone: '+91 89615 48205',
  phoneHref: 'tel:+918961548205',
  email: 'gyankrishna@phenixlabs.in',
  emailHref: 'mailto:gyankrishna@phenixlabs.in',
  hours: 'Monday–Friday · 08:00–17:00',
  responseTime: 'Usually within one business day',
  address: 'TC 6/215/NLRA 135, Neerazhi Line, Ulloor, Thiruvananthapuram 695011',
  socialLinks: [
    { id: 'instagram', platform: 'instagram', label: 'Instagram', href: SEO_CONFIG.social.instagram },
    { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', href: SEO_CONFIG.social.linkedin },
    { id: 'facebook', platform: 'facebook', label: 'Facebook', href: SEO_CONFIG.social.facebook },
    {
      id: 'x',
      platform: 'x',
      label: 'X / Twitter',
      href: `https://twitter.com/${SEO_CONFIG.social.twitter.replace('@', '')}`,
    },
  ],
}
