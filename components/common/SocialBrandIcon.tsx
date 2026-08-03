import { LucideIcon } from '@/components/common/LucideIcon'

interface SocialBrandIconProps {
  platform: string
  customIcon?: string
  className?: string
}

/** Maps persisted social-network identifiers to lightweight inline brand marks. */
export function SocialBrandIcon({
  platform,
  customIcon,
  className = 'size-4',
}: SocialBrandIconProps) {
  if (platform === 'instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.7" r="1.15" fill="currentColor" />
      </svg>
    )
  }

  if (platform === 'linkedin') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M5.2 8.2H2.3V21h2.9V8.2ZM3.75 2.5A1.72 1.72 0 1 0 3.75 5.94 1.72 1.72 0 0 0 3.75 2.5ZM21.7 13.65c0-3.86-2.06-5.66-4.8-5.66a4.16 4.16 0 0 0-3.77 2.08V8.2h-2.9V21h2.9v-6.34c0-1.67.32-3.29 2.39-3.29 2.04 0 2.06 1.91 2.06 3.4V21h2.9l1.22-7.35Z" />
      </svg>
    )
  }

  if (platform === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M14.2 21v-8h2.7l.4-3.1h-3.1V7.92c0-.9.25-1.51 1.56-1.51h1.66V3.64a22.3 22.3 0 0 0-2.42-.13c-2.4 0-4.04 1.46-4.04 4.15V9.9H8.25V13h2.71v8h3.24Z" />
      </svg>
    )
  }

  if (platform === 'x') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M18.9 2.5h3.6l-7.86 8.98L23.9 21.5h-7.25l-5.68-7.42-6.5 7.42H.86l8.42-9.62L.4 2.5h7.43l5.13 6.78L18.9 2.5Zm-1.27 17.24h2L6.73 4.17H4.58l13.05 15.57Z" />
      </svg>
    )
  }

  if (platform === 'github') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    )
  }

  if (platform === 'youtube') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.5 3.56 12 3.56 12 3.56s-7.5 0-9.4.52A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.12A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.83 12 9.6 15.6Z" />
      </svg>
    )
  }

  if (platform === 'whatsapp') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12.04 2a9.84 9.84 0 0 0-8.49 14.8L2 22l5.33-1.4A9.95 9.95 0 1 0 12.04 2Zm0 17.9a8 8 0 0 1-4.08-1.12l-.3-.18-3.17.83.85-3.08-.2-.32A7.96 7.96 0 1 1 12.04 19.9Zm4.37-5.96c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-1.41-.7-2.34-1.26-3.28-2.86-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62 1.52.66 2.12.71 2.88.6.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    )
  }

  if (platform === 'discord') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M20.32 4.37A19.8 19.8 0 0 0 15.44 3a13.5 13.5 0 0 0-.62 1.27 18.3 18.3 0 0 0-5.64 0A13.5 13.5 0 0 0 8.56 3a19.7 19.7 0 0 0-4.89 1.38C.58 8.96-.26 13.42.16 17.82A19.9 19.9 0 0 0 6.15 21c.48-.66.91-1.36 1.28-2.1-.7-.26-1.37-.59-2.01-.98.17-.12.33-.25.49-.38a14.2 14.2 0 0 0 12.18 0l.5.38c-.65.39-1.32.72-2.02.98.37.74.8 1.44 1.28 2.1a19.8 19.8 0 0 0 5.99-3.18c.5-5.1-.85-9.53-3.52-13.45ZM8.02 15.15c-1.17 0-2.13-1.08-2.13-2.4s.94-2.4 2.13-2.4c1.2 0 2.15 1.09 2.13 2.4 0 1.32-.94 2.4-2.13 2.4Zm7.96 0c-1.17 0-2.13-1.08-2.13-2.4s.94-2.4 2.13-2.4c1.2 0 2.15 1.09 2.13 2.4 0 1.32-.93 2.4-2.13 2.4Z" />
      </svg>
    )
  }

  return <LucideIcon aria-hidden="true" name={customIcon || 'link'} className={className} />
}
