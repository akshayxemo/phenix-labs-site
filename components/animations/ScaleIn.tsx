'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
}

/**
 * Scale in animation component
 * @param children - Content to animate
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 */
export function ScaleIn({ children, delay = 0, duration = 0.5 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}
