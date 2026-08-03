import { DEFAULT_CONTACT_SETTINGS } from '@/config/contact'
import { sanityClient } from '@/sanity/lib/client'
import type { ContactSettings } from '@/types'

interface SanitySocialLink {
  _key?: string
  platform?: string
  customLabel?: string
  customIcon?: string
  href?: string
}

interface SanityContactSettings {
  phone?: string
  email?: string
  hours?: string
  responseTime?: string
  address?: string
  socialLinks?: SanitySocialLink[]
}

const contactSettingsQuery = `*[
  _type == "contactSettings" &&
  _id == "contactSettings"
][0]{
  phone,
  email,
  hours,
  responseTime,
  address,
  "socialLinks": socialLinks[coalesce(isVisible, true) == true]{
    _key,
    platform,
    customLabel,
    customIcon,
    "href": url
  }
}`

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  x: 'X / Twitter',
  github: 'GitHub',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  discord: 'Discord',
}

function phoneHref(phone: string) {
  // Strip formatting while retaining a leading plus for a valid `tel:` target.
  const normalized = phone.replace(/[^\d+]/g, '')
  return normalized ? `tel:${normalized}` : ''
}

/** Resolves the Contact singleton into UI-ready links with safe defaults. */
export async function getContactSettings(): Promise<ContactSettings> {
  try {
    const settings = await sanityClient.fetch<SanityContactSettings | null>(
      contactSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    )

    if (!settings) return DEFAULT_CONTACT_SETTINGS

    const phone = settings.phone?.trim() ?? ''
    const email = settings.email?.trim() ?? ''
    const socialLinks = (settings.socialLinks ?? [])
      .filter(
        (link): link is SanitySocialLink & { platform: string; href: string } =>
          Boolean(link.platform?.trim() && link.href?.trim()),
      )
      .map((link, index) => ({
        id: link._key || `${link.platform}-${index}`,
        platform: link.platform,
        label:
          link.platform === 'custom'
            ? link.customLabel?.trim() || 'External link'
            : platformLabels[link.platform] || link.customLabel?.trim() || 'External link',
        href: link.href,
        customIcon: link.platform === 'custom' ? link.customIcon || 'link' : undefined,
      }))

    return {
      phone,
      phoneHref: phoneHref(phone),
      email,
      emailHref: email ? `mailto:${email}` : '',
      hours: settings.hours?.trim() ?? '',
      responseTime: settings.responseTime?.trim() ?? '',
      address: settings.address?.trim() ?? '',
      socialLinks,
    }
  } catch (error) {
    console.warn('[Sanity] Could not load contact settings.', error)
    return DEFAULT_CONTACT_SETTINGS
  }
}
