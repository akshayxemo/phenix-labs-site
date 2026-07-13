import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
}

/**
 * Empty state component for no data scenarios
 * @param icon - Optional icon element
 * @param title - Empty state title
 * @param description - Empty state description
 * @param action - Optional action button
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
      {icon && <div className="text-4xl text-muted-foreground">{icon}</div>}
      <div className="space-y-2">
        <h3 className="text-h4">{title}</h3>
        <p className="text-small text-muted-foreground">{description}</p>
      </div>
      {action && <div className="pt-4">{action}</div>}
    </div>
  )
}
