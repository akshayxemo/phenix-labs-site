'use client'

import { Boxes, type LucideProps } from 'lucide-react'
import {
  DynamicIcon,
  iconNames,
  type IconName,
} from 'lucide-react/dynamic'

interface ServiceIconProps extends LucideProps {
  name: string
}

const iconNameSet = new Set<string>(iconNames)

export function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const safeName: IconName = iconNameSet.has(name) ? (name as IconName) : 'boxes'

  return (
    <DynamicIcon
      {...props}
      name={safeName}
      fallback={() => <Boxes {...props} />}
    />
  )
}
