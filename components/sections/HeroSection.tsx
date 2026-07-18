import { ReactNode } from 'react'
import Link from 'next/link'
import { Container } from '../layout/Container'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  children?: ReactNode
  cta?: {
    text: string
    href: string
  }
  className?: string
  background?: 'default' | 'gradient' | 'accent'
}

const backgroundClasses = {
  default: 'bg-hero-background',
  gradient: 'bg-gradient-to-b from-hero-background to-background',
  accent: 'bg-primary text-primary-foreground',
}

/**
 * Hero section component for page headers
 * @param title - Hero title
 * @param subtitle - Optional subtitle
 * @param description - Optional description
 * @param children - Optional action buttons or additional content
 * @param className - Additional CSS classes
 * @param background - Background variant (default: 'default')
 */
export function HeroSection({
  title,
  subtitle,
  description,
  children,
  cta,
  className,
  background = 'default',
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        backgroundClasses[background],
        'w-full py-16 sm:py-24 lg:py-32 relative overflow-hidden',
        className
      )}
      aria-label="Hero section"
      role="region"
    >
      {/* Background gradient decoration - decorative only */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <Container>
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {subtitle && (
                <p className="text-label text-primary font-semibold" aria-label="Subtitle">
                  {subtitle}
                </p>
              )}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">{title}</h1>
              {description && (
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">{description}</p>
              )}
              {(children || cta) && (
                <div className="flex pt-4" role="group" aria-label="Call to action buttons">
                  {children ?? (
                    <Link
                      href={cta!.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-8 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {cta!.text}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Right Image Placeholder */}
            <div
              className="relative h-96 lg:h-full hidden lg:flex items-center justify-center"
              aria-hidden="true"
            >
              {/* TODO: Replace with actual hero hands image */}
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 font-semibold text-lg">Hero Image</p>
                  <p className="text-gray-500 text-sm mt-2">Hands/Robotic hands illustration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
