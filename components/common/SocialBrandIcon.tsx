interface SocialBrandIconProps {
  brand: string
  className?: string
}

export function SocialBrandIcon({ brand, className = 'size-4' }: SocialBrandIconProps) {
  if (brand === 'Instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.7" r="1.15" fill="currentColor" />
      </svg>
    )
  }

  if (brand === 'LinkedIn') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M5.2 8.2H2.3V21h2.9V8.2ZM3.75 2.5A1.72 1.72 0 1 0 3.75 5.94 1.72 1.72 0 0 0 3.75 2.5ZM21.7 13.65c0-3.86-2.06-5.66-4.8-5.66a4.16 4.16 0 0 0-3.77 2.08V8.2h-2.9V21h2.9v-6.34c0-1.67.32-3.29 2.39-3.29 2.04 0 2.06 1.91 2.06 3.4V21h2.9l1.22-7.35Z" />
      </svg>
    )
  }

  if (brand === 'Facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M14.2 21v-8h2.7l.4-3.1h-3.1V7.92c0-.9.25-1.51 1.56-1.51h1.66V3.64a22.3 22.3 0 0 0-2.42-.13c-2.4 0-4.04 1.46-4.04 4.15V9.9H8.25V13h2.71v8h3.24Z" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.9 2.5h3.6l-7.86 8.98L23.9 21.5h-7.25l-5.68-7.42-6.5 7.42H.86l8.42-9.62L.4 2.5h7.43l5.13 6.78L18.9 2.5Zm-1.27 17.24h2L6.73 4.17H4.58l13.05 15.57Z" />
    </svg>
  )
}
