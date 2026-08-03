import { Analytics } from '@vercel/analytics/next'
import { DM_Sans } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { JsonLd } from '@/components/common/JsonLd'
import { getContactSettings } from '@/lib/data/contact'
import {
  generateMetadata,
  getOrganizationSchema,
  getWebsiteSchema,
  siteMetadata,
} from '@/lib/seo'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  ...generateMetadata({
    title: siteMetadata.name,
    description: siteMetadata.description,
  }),
  generator: 'Next.js',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Keep organization schema synchronized with the contact singleton in Sanity.
  const contact = await getContactSettings()

  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <JsonLd data={[getOrganizationSchema(contact), getWebsiteSchema()]} />
      </head>
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
