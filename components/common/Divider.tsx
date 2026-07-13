import { cn } from '@/lib/utils'

interface DividerProps {
  className?: string
  variant?: 'default' | 'subtle'
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Divider component for visual separation
 * @param className - Additional CSS classes
 * @param variant - Visual style (default: 'default')
 * @param orientation - Divider direction (default: 'horizontal')
 */
export function Divider({
  className,
  variant = 'default',
  orientation = 'horizontal',
}: DividerProps) {
  const variantClasses = {
    default: 'bg-border',
    subtle: 'bg-border/50',
  }

  const orientationClasses = {
    horizontal: 'h-px w-full',
    vertical: 'w-px h-full',
  }

  return (
    <div
      className={cn(variantClasses[variant], orientationClasses[orientation], className)}
      role="separator"
      aria-orientation={orientation}
    />
  )
}
