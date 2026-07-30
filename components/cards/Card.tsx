import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'sm' | 'md' | 'lg' | 'hover'
  border?: boolean
  hover?: boolean
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const shadowClasses = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  hover: 'shadow-card hover:shadow-hover transition-shadow duration-300',
}

/**
 * Card component for content containers
 * @param children - Card content
 * @param className - Additional CSS classes
 * @param padding - Internal padding (default: 'md')
 * @param shadow - Shadow style (default: 'md')
 * @param border - Show border (default: true)
 * @param hover - Enable hover effect (default: false)
 */
export function Card({
  children,
  className,
  padding = 'md',
  shadow = 'md',
  border = true,
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-card rounded-[20px]',
        paddingClasses[padding],
        shadowClasses[shadow],
        border && 'border border-border',
        hover && 'hover:border-accent/50 cursor-pointer transition-colors duration-200',
        className,
      )}
    >
      {children}
    </div>
  )
}
