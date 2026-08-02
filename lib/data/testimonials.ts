import { sanityClient } from '@/sanity/lib/client'

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company?: string
  rating: number
}

interface SanityTestimonial extends Testimonial {
  createdAt: string
}

export interface TestimonialsPage {
  items: Testimonial[]
  nextCursor: string | null
}

export const TESTIMONIAL_PAGE_SIZE = 12

const testimonialProjection = `{
  "id": _id,
  "quote": review,
  "author": name,
  "role": coalesce(position, ""),
  "company": clientCompany,
  "rating": coalesce(stars, 5),
  "createdAt": _createdAt
}`

const homeTestimonialQuery = `*[
  _type == "testimonials" &&
  coalesce(isActive, false) == true &&
  defined(name) &&
  defined(review)
] | order(coalesce(order, 9999) asc, _createdAt desc)[0...8] ${testimonialProjection}`

const archiveBaseFilter = `
  _type == "testimonials" &&
  defined(name) &&
  defined(review)
`

const firstArchivePageQuery = `*[
  ${archiveBaseFilter}
] | order(_createdAt desc, _id desc)[0...13] ${testimonialProjection}`

const nextArchivePageQuery = `*[
  ${archiveBaseFilter} &&
  (
    _createdAt < $createdAt ||
    (_createdAt == $createdAt && _id < $id)
  )
] | order(_createdAt desc, _id desc)[0...13] ${testimonialProjection}`

function encodeCursor(testimonial: SanityTestimonial) {
  return Buffer.from(
    JSON.stringify({ createdAt: testimonial.createdAt, id: testimonial.id }),
  ).toString('base64url')
}

function decodeCursor(cursor: string) {
  const parsed = JSON.parse(
    Buffer.from(cursor, 'base64url').toString('utf8'),
  ) as { createdAt?: unknown; id?: unknown }

  if (typeof parsed.createdAt !== 'string' || typeof parsed.id !== 'string') {
    throw new Error('Invalid testimonial cursor')
  }

  return { createdAt: parsed.createdAt, id: parsed.id }
}

function toPublicTestimonial(testimonial: SanityTestimonial): Testimonial {
  return {
    id: testimonial.id,
    quote: testimonial.quote,
    author: testimonial.author,
    role: testimonial.role,
    company: testimonial.company,
    rating: testimonial.rating,
  }
}

/** Home carousel data: only testimonials marked active in Sanity. */
export async function getHomeTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await sanityClient.fetch<SanityTestimonial[]>(
      homeTestimonialQuery,
      {},
      { next: { revalidate: 60 } },
    )

    return testimonials.map(toPublicTestimonial)
  } catch (error) {
    console.warn('[Sanity] Could not load Home testimonials.', error)
    return []
  }
}

/** Archive data: all testimonials, loaded in cursor pages regardless of active state. */
export async function getTestimonialsPage(
  cursor?: string,
): Promise<TestimonialsPage> {
  const params = cursor ? decodeCursor(cursor) : {}
  const query = cursor ? nextArchivePageQuery : firstArchivePageQuery
  const fetched = await sanityClient.fetch<SanityTestimonial[]>(query, params, {
    next: { revalidate: 60 },
  })
  const hasMore = fetched.length > TESTIMONIAL_PAGE_SIZE
  const visibleItems = fetched.slice(0, TESTIMONIAL_PAGE_SIZE)

  return {
    items: visibleItems.map(toPublicTestimonial),
    nextCursor:
      hasMore && visibleItems.length > 0
        ? encodeCursor(visibleItems[visibleItems.length - 1])
        : null,
  }
}
