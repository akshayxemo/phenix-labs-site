import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string | ReactNode
  description?: string | ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

/**
 * Section header with title, subtitle, and description
 * @param title - Main heading
 * @param subtitle - Optional subtitle
 * @param description - Optional description text
 * @param className - Additional CSS classes
 * @param align - Text alignment (default: 'center')
 */
export function SectionHeader({
  title,
  subtitle,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-4', alignClasses[align], className)}>
      {subtitle && <p className="text-label text-muted-foreground">{subtitle}</p>}
      <h2 className="text-h2">{title}</h2>
      {description && (
        <p className="text-body-large mx-auto max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
