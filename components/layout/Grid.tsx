import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GridProps {
  children: ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 6
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

const colsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
}

const gapClasses = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
}

/**
 * Grid component for multi-column layouts
 * @param children - Grid items
 * @param className - Additional CSS classes
 * @param cols - Number of columns (default: 3)
 * @param gap - Gap between items (default: 'md')
 * @param responsive - Enable responsive columns (default: true)
 */
export function Grid({
  children,
  className,
  cols = 3,
  gap = 'md',
  responsive = true,
}: GridProps) {
  const responsiveClasses = responsive
    ? {
        1: 'grid-cols-1',
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4',
        6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
      }
    : colsClasses

  return (
    <div
      className={cn('grid', responsiveClasses[cols], gapClasses[gap], 'grid-cols-1', className)}
    >
      {children}
    </div>
  )
}
