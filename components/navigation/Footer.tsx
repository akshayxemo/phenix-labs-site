import { ReactNode } from 'react'
import { Container } from '../layout/Container'
import { Stack } from '../layout/Stack'
import { Divider } from '../common/Divider'
import { Logo } from '../common/Logo'

interface FooterColumn {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

interface FooterProps {
  columns: FooterColumn[]
  children?: ReactNode
  copyrightText?: string
}

/**
 * Footer component with multiple columns of links
 * @param columns - Footer columns with title and links
 * @param children - Optional additional content
 * @param copyrightText - Copyright text (default: current year)
 */
export function Footer({ columns, children, copyrightText }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const defaultCopyright = `© ${currentYear} Phenix Labs. All rights reserved.`

  return (
    <footer className="bg-footer text-foreground dark:bg-surface-variant">
      <Container>
        <div className="py-12 space-y-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo/Brand section */}
            <div className="space-y-4">
              <Logo variant="light" />
              <p className="text-small text-muted-foreground">
                Premium engineering solutions for modern businesses.
              </p>
            </div>

            {/* Link columns */}
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <h3 className="text-small font-semibold">{column.title}</h3>
                <Stack gap="xs">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-small text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </Stack>
              </div>
            ))}
          </div>

          {/* Custom content */}
          {children && <div>{children}</div>}

          {/* Divider */}
          <Divider variant="subtle" />

          {/* Copyright */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-caption text-muted-foreground">
              {copyrightText || defaultCopyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
