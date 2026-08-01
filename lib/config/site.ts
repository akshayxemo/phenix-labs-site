import type { FooterData, NavbarData } from '@/types'
import { DEFAULT_CONTACT_SETTINGS } from '@/config/contact'
import { getContactSettings } from '@/lib/data/contact'

/**
 * Persistent site-wide navigation configuration.
 *
 * `showInFooter` controls whether a navbar item also appears in the footer.
 */
export const navbarData: NavbarData = {
  logo: {
    text: 'Phenix Labs',
    href: '/',
    imageSrc: '/images/logo.png',
  },
  links: [
    { label: 'Home', href: '/', isActive: true, showInFooter: true },
    { label: 'About', href: '/about', showInFooter: true },
    { label: 'Services', href: '/services', showInFooter: true },
    { label: 'Products', href: '/cases', showInFooter: true },
    { label: 'Testimonials', href: '/testimonials', showInFooter: true },
  ],
  contactCta: {
    text: 'Contact Us',
    href: '/contact',
  },
  cta: {
    text: 'Education',
    href: '/services#education',
  },
}

/**
 * Persistent site-wide footer configuration.
 *
 * Footer navigation is derived from `navbarData.links`.
 */
export const footerData: FooterData = {
  copyright: '© 2026 Phenix Labs. All rights reserved.',
  contact: DEFAULT_CONTACT_SETTINGS,
}

export async function getNavbarData(): Promise<NavbarData> {
  return navbarData
}

export async function getFooterData(): Promise<FooterData> {
  return {
    ...footerData,
    contact: await getContactSettings(),
  }
}
