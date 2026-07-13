import { ReactNode } from 'react'
import { Container } from '../layout/Container'
import { Stack } from '../layout/Stack'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  children?: ReactNode
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
  className,
  background = 'default',
}: HeroSectionProps) {
  return (
    <section className={cn(backgroundClasses[background], 'w-full py-24 sm:py-32', className)}>
      <Container>
        <div className="space-y-6 text-center">
          {subtitle && <p className="text-label text-muted-foreground">{subtitle}</p>}
          <h1 className="text-display-xl">{title}</h1>
          {description && (
            <p className="text-body-large mx-auto max-w-2xl text-muted-foreground">{description}</p>
          )}
          {children && <div className="flex justify-center pt-4">{children}</div>}
        </div>
      </Container>
    </section>
  )
}
