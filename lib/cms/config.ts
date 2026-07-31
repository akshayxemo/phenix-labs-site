import { apiVersion, dataset, projectId } from '@/sanity/env'

export const cmsConfig = {
  provider: process.env.NEXT_PUBLIC_CMS_PROVIDER || 'mock', // 'mock' | 'sanity'

  sanity: {
    projectId,
    dataset,
    apiVersion,
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
