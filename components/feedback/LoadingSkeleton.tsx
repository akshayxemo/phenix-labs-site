import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'image'
  count?: number
}

/**
 * Loading skeleton component for placeholder states
 * @param className - Additional CSS classes
 * @param variant - Skeleton type (default: 'text')
 * @param count - Number of skeleton lines (default: 1)
 */
export function LoadingSkeleton({ className, variant = 'text', count = 1 }: LoadingSkeletonProps) {
  const skeletonClasses = {
    text: 'h-4 rounded',
    card: 'h-32 rounded-[20px]',
    image: 'aspect-square rounded-[20px]',
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-gradient-to-r from-muted via-muted-foreground/20 to-muted',
            skeletonClasses[variant],
            className,
          )}
        />
      ))}
    </div>
  )
}
