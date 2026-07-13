import { Card } from './Card'

interface StatCardProps {
  label: string
  value: string | number
  description?: string
  className?: string
}

/**
 * Stat card for displaying key metrics
 * @param label - Stat label
 * @param value - Stat value
 * @param description - Optional description
 * @param className - Additional CSS classes
 */
export function StatCard({ label, value, description, className }: StatCardProps) {
  return (
    <Card padding="lg" border={false} shadow="sm" className={className}>
      <div className="space-y-2">
        <p className="text-small text-muted-foreground">{label}</p>
        <p className="text-h3 font-bold">{value}</p>
        {description && <p className="text-caption text-muted-foreground">{description}</p>}
      </div>
    </Card>
  )
}
