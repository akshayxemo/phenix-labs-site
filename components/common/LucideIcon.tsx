'use client'

import { Link, type LucideProps } from 'lucide-react'
import {
  DynamicIcon,
  iconNames,
  type IconName,
} from 'lucide-react/dynamic'

const iconNameSet = new Set<string>(iconNames)

interface LucideIconProps extends LucideProps {
  name: string
}

/** Safely resolves a CMS-provided Lucide icon name with a predictable fallback. */
export function LucideIcon({ name, ...props }: LucideIconProps) {
  const safeName: IconName = iconNameSet.has(name) ? (name as IconName) : 'link'

  return (
    <DynamicIcon
      {...props}
      name={safeName}
      fallback={() => <Link {...props} />}
    />
  )
}
