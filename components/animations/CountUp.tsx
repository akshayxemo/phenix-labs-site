'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  value: number
  suffix?: string
  duration?: number
  delay?: number
}

/** Animates a numeric statistic once it enters the viewport; respects reduced motion. */
export function CountUp({
  value,
  suffix = '',
  duration = 1.5,
  delay = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const shouldReduceMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (shouldReduceMotion) {
      const frame = requestAnimationFrame(() => setDisplayValue(value))
      return () => cancelAnimationFrame(frame)
    }

    let animationFrame = 0
    const timeout = window.setTimeout(() => {
      const startedAt = performance.now()

      const update = (now: number) => {
        const progress = Math.min((now - startedAt) / (duration * 1000), 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)

        setDisplayValue(Math.round(value * easedProgress))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(update)
        }
      }

      animationFrame = requestAnimationFrame(update)
    }, delay * 1000)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(animationFrame)
    }
  }, [delay, duration, isInView, shouldReduceMotion, value])

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {displayValue.toLocaleString()}
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString()}
        {suffix}
      </span>
    </>
  )
}
