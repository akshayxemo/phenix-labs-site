import { ReactNode } from 'react'
import { Card } from './Card'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon?: ReactNode
  title: string
  description: string
  className?: string
  accentColor?: 'primary' | 'accent' | 'success' | 'warning'
}

/**
 * Feature card with icon, title, and description
 * @param icon - Optional icon element
 * @param title - Feature title
 * @param description - Feature description
 * @param className - Additional CSS classes
 * @param accentColor - Icon accent color (default: 'primary')
 */
export function FeatureCard({
  icon,
  title,
  description,
  className,
  accentColor = 'primary',
}: FeatureCardProps) {
  const accentClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
  }

  return (
    <Card padding="lg" hover className={className}>
      <div className="space-y-4">
        {icon && (
          <div className={cn('h-12 w-12 flex items-center justify-center', accentClasses[accentColor])}>
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-h4">{title}</h3>
          <p className="text-small text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  )
}
