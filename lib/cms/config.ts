/**
 * CMS Configuration Layer
 * 
 * This file demonstrates how Sanity will be integrated
 * Currently uses mock data, but structure is ready for Sanity
 */

export const cmsConfig = {
  provider: process.env.NEXT_PUBLIC_CMS_PROVIDER || 'mock', // 'mock' | 'sanity'
  
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
  },
}

/**
 * CMS Provider type
 * Allows switching between different data sources
 */
export type CmsProvider = 'mock' | 'sanity'

export const isSanityEnabled = (): boolean => {
  return (
    cmsConfig.provider === 'sanity' &&
    !!cmsConfig.sanity.projectId
  )
}
