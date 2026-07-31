import { defineField, defineType } from 'sanity'

export const inventionType = defineType({
  name: 'inventions',
  title: 'Inventions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rows',
      title: 'Image Rows',
      type: 'number',
      validation: (rule) => rule.min(1).max(4),
    }),
    defineField({
      name: 'cols',
      title: 'Image Columns',
      type: 'number',
      validation: (rule) => rule.min(1).max(4),
    }),
  ],
})
