import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

/**
 * Checkbox component with optional label
 * Supports all standard HTML checkbox input attributes
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex items-center space-x-3">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            'h-5 w-5 rounded border-2 border-border bg-background',
            'cursor-pointer accent-primary',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            error && 'border-destructive',
            className,
          )}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className="cursor-pointer text-small font-medium">
            {label}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
