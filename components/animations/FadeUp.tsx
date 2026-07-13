'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
}

/**
 * Fade up animation component
 * @param children - Content to animate
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 */
export function FadeUp({ children, delay = 0, duration = 0.5 }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}
