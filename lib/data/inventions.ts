import { sanityClient } from '@/sanity/lib/client'

export const INVENTION_PAGE_SIZE = 12

export const inventionSorts = [
  'latest',
  'oldest',
  'title-asc',
  'title-desc',
] as const

export type InventionSort = (typeof inventionSorts)[number]

export interface Invention {
  id: string
  title: string
  description: string
  imageUrl?: string
  createdAt: string
}

interface SanityInvention extends Invention {
  sortValue: string
}

export interface InventionsPage {
  items: Invention[]
  nextCursor: string | null
  total: number
}

const featuredInventionsQuery = `*[
  _type == "inventions" &&
  coalesce(featureOnHome, false) == true &&
  defined(title)
] | order(_createdAt desc, _id desc)[0...5] {
  "id": _id,
  title,
  "description": coalesce(description, ""),
  "imageUrl": image.asset->url,
  "createdAt": _createdAt,
  "sortValue": _createdAt
}`

const inventionByIdQuery = `*[
  _type == "inventions" &&
  _id == $id &&
  defined(title)
][0] {
  "id": _id,
  title,
  "description": coalesce(description, ""),
  "imageUrl": image.asset->url,
  "createdAt": _createdAt,
  "sortValue": _createdAt
}`

interface CursorPayload {
  sort: InventionSort
  value: string
  id: string
}

const sortConfiguration: Record<
  InventionSort,
  { order: string; value: string; comparison: '>' | '<' }
> = {
  latest: {
    order: '_createdAt desc, _id desc',
    value: '_createdAt',
    comparison: '<',
  },
  oldest: {
    order: '_createdAt asc, _id asc',
    value: '_createdAt',
    comparison: '>',
  },
  'title-asc': {
    order: 'lower(title) asc, _id asc',
    value: 'lower(title)',
    comparison: '>',
  },
  'title-desc': {
    order: 'lower(title) desc, _id desc',
    value: 'lower(title)',
    comparison: '<',
  },
}

function encodeCursor(invention: SanityInvention, sort: InventionSort) {
  return Buffer.from(
    JSON.stringify({ sort, value: invention.sortValue, id: invention.id }),
  ).toString('base64url')
}

function decodeCursor(cursor: string, sort: InventionSort): CursorPayload {
  const parsed = JSON.parse(
    Buffer.from(cursor, 'base64url').toString('utf8'),
  ) as Partial<CursorPayload>

  if (
    parsed.sort !== sort ||
    typeof parsed.value !== 'string' ||
    typeof parsed.id !== 'string'
  ) {
    throw new Error('Invalid invention cursor')
  }

  return parsed as CursorPayload
}

function toPublicInvention(invention: SanityInvention): Invention {
  return {
    id: invention.id,
    title: invention.title,
    description: invention.description,
    imageUrl: invention.imageUrl,
    createdAt: invention.createdAt,
  }
}

export async function getInventionsPage({
  cursor,
  search = '',
  sort = 'latest',
}: {
  cursor?: string
  search?: string
  sort?: InventionSort
} = {}): Promise<InventionsPage> {
  const normalizedSearch = search.trim().slice(0, 80)
  const sortConfig = sortConfiguration[sort]
  const cursorPayload = cursor ? decodeCursor(cursor, sort) : null
  const searchFilter = normalizedSearch
    ? ' && (title match $term || description match $term)'
    : ''
  const cursorFilter = cursorPayload
    ? ` && (
      ${sortConfig.value} ${sortConfig.comparison} $cursorValue ||
      (${sortConfig.value} == $cursorValue && _id ${sortConfig.comparison} $cursorId)
    )`
    : ''
  const baseFilter = `_type == "inventions" && defined(title)${searchFilter}`
  const query = `{
    "items": *[
      ${baseFilter}${cursorFilter}
    ] | order(${sortConfig.order})[0...${INVENTION_PAGE_SIZE + 1}] {
      "id": _id,
      title,
      "description": coalesce(description, ""),
      "imageUrl": image.asset->url,
      "createdAt": _createdAt,
      "sortValue": ${sortConfig.value}
    },
    "total": count(*[${baseFilter}])
  }`
  const params = {
    ...(normalizedSearch ? { term: `${normalizedSearch}*` } : {}),
    ...(cursorPayload
      ? { cursorValue: cursorPayload.value, cursorId: cursorPayload.id }
      : {}),
  }

  const result = await sanityClient.fetch<{
    items: SanityInvention[]
    total: number
  }>(query, params, { next: { revalidate: 60 } })
  const hasMore = result.items.length > INVENTION_PAGE_SIZE
  const visibleItems = result.items.slice(0, INVENTION_PAGE_SIZE)

  return {
    items: visibleItems.map(toPublicInvention),
    nextCursor:
      hasMore && visibleItems.length > 0
        ? encodeCursor(visibleItems[visibleItems.length - 1], sort)
        : null,
    total: result.total,
  }
}

export async function getFeaturedInventions(): Promise<Invention[]> {
  try {
    const inventions = await sanityClient.fetch<SanityInvention[]>(
      featuredInventionsQuery,
      {},
      { next: { revalidate: 60 } },
    )

    return inventions.map(toPublicInvention)
  } catch (error) {
    console.warn('[Sanity] Could not load featured inventions.', error)
    return []
  }
}

export async function getInventionById(id: string): Promise<Invention | null> {
  const normalizedId = id.trim().slice(0, 128)
  if (!normalizedId) return null

  try {
    const invention = await sanityClient.fetch<SanityInvention | null>(
      inventionByIdQuery,
      { id: normalizedId },
      { next: { revalidate: 60 } },
    )

    return invention ? toPublicInvention(invention) : null
  } catch (error) {
    console.warn('[Sanity] Could not load the requested invention.', error)
    return null
  }
}

export function isInventionSort(value: string): value is InventionSort {
  return inventionSorts.includes(value as InventionSort)
}
