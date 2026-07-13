import { cn } from '@/lib/utils'

interface SpacerProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  axis?: 'x' | 'y'
}

const sizeClasses = {
  xs: { x: 'w-2', y: 'h-2' },
  sm: { x: 'w-4', y: 'h-4' },
  md: { x: 'w-6', y: 'h-6' },
  lg: { x: 'w-8', y: 'h-8' },
  xl: { x: 'w-12', y: 'h-12' },
  '2xl': { x: 'w-16', y: 'h-16' },
}

/**
 * Spacer component for adding whitespace
 * @param className - Additional CSS classes
 * @param size - Spacer size (default: 'md')
 * @param axis - Direction (default: 'y')
 */
export function Spacer({ className, size = 'md', axis = 'y' }: SpacerProps) {
  return <div className={cn(sizeClasses[size][axis], className)} />
}
