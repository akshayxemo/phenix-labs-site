import {
  getInventionsPage,
  isInventionSort,
} from '@/lib/data/inventions'

/** Cursor-paginated inventions endpoint consumed by the Products catalogue. */
export async function GET(request: Request): Promise<Response> {
  // Validate public query parameters before forwarding them to the CMS data layer.
  const params = new URL(request.url).searchParams
  const cursor = params.get('cursor') || undefined
  const search = params.get('search') || ''
  const requestedSort = params.get('sort') || 'latest'

  if (!isInventionSort(requestedSort)) {
    return Response.json({ message: 'Invalid sort option.' }, { status: 400 })
  }

  try {
    const page = await getInventionsPage({
      cursor,
      search,
      sort: requestedSort,
    })

    return Response.json(page, {
      headers: {
        // CDN caching keeps pagination responsive while allowing recent CMS updates.
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('[Inventions API] Could not load inventions.', error)

    return Response.json(
      { message: 'Inventions could not be loaded.' },
      { status: cursor ? 400 : 500 },
    )
  }
}
