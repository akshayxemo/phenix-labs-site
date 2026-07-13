import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  variant?: 'default' | 'alternate' | 'dark'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const variantClasses = {
  default: 'bg-background',
  alternate: 'bg-surface',
  dark: 'bg-footer text-foreground dark:bg-surface-variant',
}

const paddingClasses = {
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
  xl: 'py-24 sm:py-32',
}

/**
 * Section component for organizing page content
 * @param children - Section content
 * @param className - Additional CSS classes
 * @param id - Section ID for linking
 * @param variant - Background variant (default: 'default')
 * @param padding - Vertical padding (default: 'lg')
 */
export function Section({
  children,
  className,
  id,
  variant = 'default',
  padding = 'lg',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(variantClasses[variant], paddingClasses[padding], 'w-full', className)}
    >
      {children}
    </section>
  )
}
