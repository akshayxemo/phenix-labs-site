'use client'

import { useCallback, useId, useState } from 'react'
import { Box, Button, Card, Flex, Stack, Text, TextArea } from '@sanity/ui'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { set, unset, type StringInputProps } from 'sanity'

export function MarkdownEditorInput({
  onChange,
  readOnly,
  validationError,
  value,
}: StringInputProps) {
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const inputId = useId()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  return (
    <Stack space={3}>
      <Flex gap={2}>
        <Button
          mode={mode === 'write' ? 'default' : 'bleed'}
          onClick={() => setMode('write')}
          selected={mode === 'write'}
          text="Write"
        />
        <Button
          mode={mode === 'preview' ? 'default' : 'bleed'}
          onClick={() => setMode('preview')}
          selected={mode === 'preview'}
          text="Preview"
        />
      </Flex>

      {mode === 'write' ? (
        <TextArea
          customValidity={validationError}
          disabled={readOnly}
          id={`about-markdown-${inputId}`}
          onChange={handleChange}
          padding={4}
          placeholder="# About Phenix Labs\n\nWrite the complete page in Markdown…"
          rows={28}
          value={value ?? ''}
        />
      ) : (
        <Card border padding={5} radius={2} style={{ maxHeight: '720px', overflow: 'auto' }}>
          {value?.trim() ? (
            <Box
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                overflowWrap: 'anywhere',
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 style={{ fontSize: '2rem', lineHeight: 1.15 }}>{children}</h1>,
                  h2: ({ children }) => <h2 style={{ fontSize: '1.55rem', marginTop: '2rem' }}>{children}</h2>,
                  h3: ({ children }) => <h3 style={{ fontSize: '1.2rem', marginTop: '1.5rem' }}>{children}</h3>,
                  img: ({ alt, src }) => (
                    // Studio preview intentionally uses a native image; the site renderer uses next/image.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt={alt ?? ''} src={src} style={{ borderRadius: '12px', height: 'auto', maxWidth: '100%' }} />
                  ),
                }}
              >
                {value}
              </ReactMarkdown>
            </Box>
          ) : (
            <Text muted size={1}>No Markdown content to preview.</Text>
          )}
        </Card>
      )}

      <Text muted size={1}>
        Supports headings, links, tables, task lists, blockquotes, and images. Prefix image alt text with
        {' '}<code>side-left:</code> or <code>side-right:</code> for a side-aligned image on the site.
      </Text>
    </Stack>
  )
}
