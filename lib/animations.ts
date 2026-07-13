/**
 * Reusable animation variants for Framer Motion
 */

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  }),
}

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
    },
  }),
}

export const slideLeftVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  }),
}

export const slideRightVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  }),
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export const hoverLiftVariants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
    },
  },
}

export const buttonPressVariants = {
  tap: {
    scale: 0.95,
  },
  hover: {
    scale: 1.02,
  },
}
