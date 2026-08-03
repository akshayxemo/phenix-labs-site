import { getTestimonialsPage } from '@/lib/data/testimonials'

/** Cursor-paginated testimonial endpoint used by the public archive. */
export async function GET(request: Request): Promise<Response> {
  const cursor = new URL(request.url).searchParams.get('cursor') || undefined

  try {
    const page = await getTestimonialsPage(cursor)

    return Response.json(page, {
      headers: {
        // Cache at the edge briefly; stale content may be served during revalidation.
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('[Testimonials API] Could not load testimonials.', error)

    return Response.json(
      { message: 'Testimonials could not be loaded.' },
      { status: cursor ? 400 : 500 },
    )
  }
}
