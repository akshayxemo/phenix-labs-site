/** Shared Sanity API version and public environment configuration. */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'idru3odt'

export const studioUrl = '/admin'
