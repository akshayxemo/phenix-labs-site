import type { ContactSettings } from '@/types'

/** Safe fallback used when the Contact & Social singleton is missing or unavailable. */
export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  phone: '+91 89615 48205',
  phoneHref: 'tel:+918961548205',
  email: 'gyankrishna@phenixlabs.in',
  emailHref: 'mailto:gyankrishna@phenixlabs.in',
  hours: 'Monday–Friday · 08:00–17:00',
  responseTime: 'Usually within one business day',
  address: 'TC 6/215/NLRA 135, Neerazhi Line, Ulloor, Thiruvananthapuram 695011',
  socialLinks: [
    { id: 'instagram', platform: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/phenixlabs' },
    { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/phenixlabs' },
    { id: 'facebook', platform: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/phenixlabs' },
    { id: 'x', platform: 'x', label: 'X / Twitter', href: 'https://twitter.com/phenixlabs' },
  ],
}
