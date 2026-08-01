'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { FileText } from 'lucide-react'
import { dataset, projectId, studioUrl } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'phenixLabs',
  title: 'Phenix Labs Admin Panel',
  basePath: studioUrl,
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (structure) =>
        structure
          .list()
          .title('Content')
          .items([
            structure
              .listItem()
              .title('About Page')
              .icon(FileText)
              .child(
                structure
                  .document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage'),
              ),
            structure.divider(),
            ...structure
              .documentTypeListItems()
              .filter((item) => item.getId() !== 'aboutPage'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previousActions, context) =>
      context.schemaType === 'aboutPage'
        ? previousActions.filter((action) =>
            ['publish', 'discardChanges', 'restore', 'unpublish'].includes(
              action.action ?? '',
            ),
          )
        : previousActions,
    newDocumentOptions: (previousOptions) =>
      previousOptions.filter((option) => option.templateId !== 'aboutPage'),
  },
})
