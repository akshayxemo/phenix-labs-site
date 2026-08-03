import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, studioUrl } from '../env'

/** Read client used by server routes and cached data-access modules. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl,
  },
})
