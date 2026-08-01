import { defineField, defineType } from 'sanity'
import { MarkdownEditorInput } from '@/sanity/components/MarkdownEditorInput'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'markdown',
      title: 'Markdown Content',
      type: 'text',
      rows: 28,
      description: 'The complete About page body. Leave empty to render no About page content.',
      components: { input: MarkdownEditorInput },
    }),
  ],
  preview: {
    select: { markdown: 'markdown' },
    prepare({ markdown }) {
      const content = typeof markdown === 'string' ? markdown.trim() : ''
      const wordCount = content ? content.split(/\s+/).length : 0
      const firstHeading = content.match(/^#\s+(.+)$/m)?.[1]

      return {
        title: 'About Page',
        subtitle: content
          ? `${wordCount} words${firstHeading ? ` · ${firstHeading}` : ''}`
          : 'No content published',
      }
    },
  },
})
