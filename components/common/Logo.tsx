import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'default' | 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'text-lg font-bold',
  md: 'text-xl font-bold',
  lg: 'text-2xl font-bold',
}

const variantClasses = {
  default: 'text-primary',
  dark: 'text-foreground dark:text-background',
  light: 'text-background dark:text-foreground',
}

/**
 * Logo component
 * @param className - Additional CSS classes
 * @param variant - Logo style variant (default: 'default')
 * @param size - Logo size (default: 'md')
 */
export function Logo({ className, variant = 'default', size = 'md' }: LogoProps) {
  return (
    <span className={cn(sizeClasses[size], variantClasses[variant], 'font-sans', className)}>
      Phenix Labs
    </span>
  )
}
