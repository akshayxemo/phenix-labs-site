/**
 * Image optimization and metadata utilities
 */

export interface ImageMetadata {
  src: string
  alt: string
  width?: number
  height?: number
  title?: string
  loading?: 'lazy' | 'eager'
  sizes?: string
}

export interface ResponsiveImageSet {
  srcSet: string
  sizes: string
}

/**
 * Generate responsive image srcset
 */
export function getResponsiveImageSet(basePath: string, widths: number[]): ResponsiveImageSet {
  const srcSet = widths
    .map((width) => {
      // Format: /path/image-640w.jpg 640w
      const extension = basePath.split('.').pop()
      const pathWithoutExt = basePath.replace(`.${extension}`, '')
      return `${pathWithoutExt}-${width}w.${extension} ${width}w`
    })
    .join(', ')

  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return { srcSet, sizes }
}

/**
 * Common image alt texts by type
 */
export const imageAltTexts = {
  logo: 'Phenix Labs logo',
  hero: 'Hero illustration showing hands collaborating',
  feature: 'Feature illustration representing innovation',
  service: 'Service icon',
  testimonialAvatar: 'Client testimonial author avatar',
  caseStudy: 'Case study project screenshot',
  team: 'Team member photograph',
  office: 'Office environment',
  technology: 'Technology showcase',
}

/**
 * Image lazy loading configuration
 */
export const lazyLoadingConfig = {
  enabled: true,
  threshold: 0.1,
  rootMargin: '50px',
}

/**
 * Get optimized image props
 */
export function getOptimizedImageProps(params: {
  src: string
  alt: string
  title?: string
  priority?: boolean
}): ImageMetadata {
  return {
    src: params.src,
    alt: params.alt,
    title: params.title || params.alt,
    loading: params.priority ? 'eager' : 'lazy',
  }
}
