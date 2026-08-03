interface JsonLdProps {
  data: object | object[]
}

/** Safely emits schema.org JSON without allowing HTML-looking CMS text to close the script. */
export function JsonLd({ data }: JsonLdProps) {
  const entries = Array.isArray(data) ? data : [data]

  return entries.map((entry, index) => (
    <script
      // Index is stable because callers provide a fixed schema sequence per route.
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(entry).replace(/</g, '\\u003c'),
      }}
    />
  ))
}
