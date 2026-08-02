import createImageUrlBuilder, {
  type SanityImageSource,
} from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

/** Creates a transformable Sanity CDN URL builder for an image source. */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
