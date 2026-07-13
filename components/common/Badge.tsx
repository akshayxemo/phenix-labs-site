import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
  size?: 'sm' | 'md'
}

const variantClasses = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  destructive: 'bg-destructive text-white',
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
}

/**
 * Badge component for labels and tags
 * @param children - Badge content
 * @param className - Additional CSS classes
 * @param variant - Badge style variant (default: 'default')
 * @param size - Badge size (default: 'md')
 */
export function Badge({ children, className, variant = 'default', size = 'md' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
