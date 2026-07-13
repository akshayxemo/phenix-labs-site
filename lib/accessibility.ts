/**
 * Accessibility utilities for semantic HTML and ARIA attributes
 */

export const ariaLabels = {
  nav: 'Main navigation',
  skipLink: 'Skip to main content',
  searchButton: 'Search',
  menuButton: 'Menu',
  closeButton: 'Close menu',
  submitButton: 'Submit form',
  contactForm: 'Contact us form',
  newsletterForm: 'Newsletter subscription form',
}

export const roles = {
  navigation: 'navigation',
  contentInfo: 'contentinfo',
  main: 'main',
  region: 'region',
  banner: 'banner',
  complementary: 'complementary',
}

export const headingLevels = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const

/**
 * Generate proper image alt text
 */
export function getImageAltText(context: {
  title?: string
  description?: string
  context?: string
}): string {
  const parts = [context.title, context.description, context.context].filter(Boolean)
  return parts.join('. ') || 'Image'
}

/**
 * Screen reader only text utility class
 */
export const srOnlyClass =
  'sr-only absolute w-px h-px p-0 -m-px overflow-hidden clip-path-inset-50% border-0'

export const srOnlyExpandedClass =
  'not-sr-only absolute w-auto h-auto p-auto m-0 overflow-visible'
