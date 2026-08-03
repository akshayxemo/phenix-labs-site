import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './sanity/env'

/** Connects Sanity CLI commands to the same project and dataset as the application. */
export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
