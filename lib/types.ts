/**
 * Common type definitions for the design system
 */

export type ColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type Alignment = 'left' | 'center' | 'right'

export type Direction = 'row' | 'col'

export type Shadow = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hover' | 'card' | 'modal'

export type Radius = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ResponsiveValue<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

/**
 * Design tokens for consistency
 */
export const SPACING = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
} as const

export const BORDER_RADIUS = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const

export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  hover: '0 20px 25px -5px rgb(0 0 0 / 0.15)',
  card: '0 4px 6px -1px rgb(0 0 0 / 0.08)',
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const

export const BREAKPOINTS = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
