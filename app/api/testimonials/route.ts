import { getTestimonialsPage } from '@/lib/data/testimonials'

export async function GET(request: Request): Promise<Response> {
  const cursor = new URL(request.url).searchParams.get('cursor') || undefined

  try {
    const page = await getTestimonialsPage(cursor)

    return Response.json(page, {
      headers: {
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
