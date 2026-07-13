import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface NavigationLinkProps extends LinkProps {
  children: ReactNode
  className?: string
  active?: boolean
}

/**
 * Navigation link component with active state styling
 * @param children - Link text
 * @param className - Additional CSS classes
 * @param active - Whether link is active
 */
export function NavigationLink({
  children,
  className,
  active,
  ...props
}: NavigationLinkProps) {
  return (
    <Link
      className={cn(
        'text-sm font-medium transition-colors duration-200',
        active
          ? 'text-primary font-semibold'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
