import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ImageWrapperProps extends Omit<ImageProps, 'alt'> {
  alt: string
  fallback?: string
  className?: string
}

/**
 * Image wrapper component using Next.js Image with proper error handling
 * @param src - Image source
 * @param alt - Image alt text (required for accessibility)
 * @param fallback - Fallback image on error
 * @param className - Additional CSS classes
 */
export function ImageWrapper({
  src,
  alt,
  fallback,
  className,
  onError,
  ...props
}: ImageWrapperProps) {
  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg bg-muted', className)}>
      <Image
        src={src}
        alt={alt}
        onError={(e) => {
          if (fallback && e.currentTarget.src !== fallback) {
            e.currentTarget.src = fallback
          }
          onError?.(e)
        }}
        {...props}
      />
    </div>
  )
}
