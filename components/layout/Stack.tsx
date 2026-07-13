import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StackProps {
  children: ReactNode
  className?: string
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
}

const gapClasses = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
}

const directionClasses = {
  row: 'flex-row',
  col: 'flex-col',
}

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
}

/**
 * Flexible stack component for layout
 * @param children - Content to stack
 * @param className - Additional CSS classes
 * @param gap - Gap between items (default: 'md')
 * @param direction - Stack direction (default: 'col')
 * @param align - Item alignment (default: 'stretch')
 * @param justify - Content justification (default: 'start')
 */
export function Stack({
  children,
  className,
  gap = 'md',
  direction = 'col',
  align = 'stretch',
  justify = 'start',
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction],
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        className,
      )}
    >
      {children}
    </div>
  )
}
