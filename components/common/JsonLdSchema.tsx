interface JsonLdSchemaProps {
  schema: Record<string, unknown>
}

/**
 * Server Component for rendering JSON-LD schemas
 * Must be used in Server Components only
 */
export function JsonLdSchema({ schema }: JsonLdSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
      suppressHydrationWarning
    />
  )
}
