'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDownAZ,
  ArrowUpAZ,
  CalendarDays,
  CalendarArrowDown,
  CalendarArrowUp,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  PanelRightOpen,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import type {
  Invention,
  InventionsPage,
  InventionSort,
} from '@/lib/data/inventions'

interface InventionsCatalogueProps {
  initialPage: InventionsPage
  initialSelectedInvention: Invention | null
}

const sortOptions: Array<{
  value: InventionSort
  label: string
  icon: typeof CalendarArrowDown
}> = [
  { value: 'latest', label: 'Newest first', icon: CalendarArrowDown },
  { value: 'oldest', label: 'Oldest first', icon: CalendarArrowUp },
  { value: 'title-asc', label: 'Title A–Z', icon: ArrowDownAZ },
  { value: 'title-desc', label: 'Title Z–A', icon: ArrowUpAZ },
]

function formatCreatedAt(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function formatFullDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function InventionCard({
  invention,
  index,
  onOpen,
}: {
  invention: Invention
  index: number
  onOpen: () => void
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : (index % 9) * 0.035,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group overflow-hidden rounded-[20px] border border-[#c1ced8] bg-white text-left shadow-[0_12px_38px_rgba(22,34,54,0.07)] outline-none transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#82a9c8] hover:shadow-[0_22px_55px_rgba(22,34,54,0.13)] focus-visible:ring-2 focus-visible:ring-[#0c70df] focus-visible:ring-offset-4 focus-visible:ring-offset-[#eaf0f4]"
      aria-label={`Open details for ${invention.title}`}
    >
      <div className="relative aspect-4/3 overflow-hidden border-b border-[#d0dae2] bg-[#e3ebf0]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(67,104,136,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(67,104,136,.2)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div aria-hidden="true" className="absolute -right-16 -top-20 size-64 rounded-full bg-[#69b8ec]/16 blur-3xl" />

        {invention.imageUrl ? (
          <Image
            src={invention.imageUrl}
            alt={invention.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-28 rounded-full border border-dashed border-[#6e91ae] bg-white/25 shadow-[0_0_0_22px_rgba(255,255,255,0.12)]" />
          </div>
        )}

        <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/75 bg-white/80 text-[#203348] opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:shadow-md">
          <PanelRightOpen aria-hidden="true" size={18} />
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0c70df]">
            Invention {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs font-medium text-[#7a8997]">
            {formatCreatedAt(invention.createdAt)}
          </span>
        </div>
        <h2 className="mt-3 line-clamp-2 text-[21px] font-bold leading-[1.18] tracking-[-0.025em] text-[#101b2d] md:text-[23px]">
          {invention.title}
        </h2>
      </div>
    </motion.button>
  )
}

export function InventionsCatalogue({
  initialPage,
  initialSelectedInvention,
}: InventionsCatalogueProps) {
  const [inventions, setInventions] = useState(initialPage.items)
  const [nextCursor, setNextCursor] = useState(initialPage.nextCursor)
  const [total, setTotal] = useState(initialPage.total)
  const [query, setQuery] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [sort, setSort] = useState<InventionSort>('latest')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [selectedInvention, setSelectedInvention] = useState<Invention | null>(
    initialSelectedInvention,
  )
  const selectedIndex = selectedInvention
    ? inventions.findIndex((item) => item.id === selectedInvention.id)
    : -1

  useEffect(() => {
    const handleHistoryNavigation = () => {
      const inventionId = new URL(window.location.href).searchParams.get(
        'invention',
      )

      if (!inventionId) {
        setSelectedInvention(null)
        return
      }

      const loadedInvention = inventions.find((item) => item.id === inventionId)
      if (loadedInvention) setSelectedInvention(loadedInvention)
    }

    window.addEventListener('popstate', handleHistoryNavigation)
    return () => window.removeEventListener('popstate', handleHistoryNavigation)
  }, [inventions])

  const requestPage = async ({
    cursor,
    search,
    nextSort,
  }: {
    cursor?: string
    search: string
    nextSort: InventionSort
  }) => {
    const params = new URLSearchParams({ sort: nextSort })
    if (search) params.set('search', search)
    if (cursor) params.set('cursor', cursor)

    const response = await fetch(`/api/inventions?${params.toString()}`)
    if (!response.ok) throw new Error('Request failed')
    return (await response.json()) as InventionsPage
  }

  const refreshCollection = async (search: string, nextSort: InventionSort) => {
    setSelectedInvention(null)
    setIsRefreshing(true)
    setError('')

    try {
      const page = await requestPage({ search, nextSort })
      setInventions(page.items)
      setNextCursor(page.nextCursor)
      setTotal(page.total)
      setActiveSearch(search)
    } catch {
      setError('The invention collection could not be updated. Please try again.')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void refreshCollection(query.trim(), sort)
  }

  const clearSearch = () => {
    setQuery('')
    void refreshCollection('', sort)
  }

  const handleSort = (nextSort: InventionSort) => {
    setSort(nextSort)
    void refreshCollection(activeSearch, nextSort)
  }

  const loadMore = async () => {
    if (!nextCursor || isLoadingMore) return

    setIsLoadingMore(true)
    setError('')

    try {
      const page = await requestPage({
        cursor: nextCursor,
        search: activeSearch,
        nextSort: sort,
      })
      setInventions((current) => [...current, ...page.items])
      setNextCursor(page.nextCursor)
      setTotal(page.total)
    } catch {
      setError('More inventions could not be loaded. Please try again.')
    } finally {
      setIsLoadingMore(false)
    }
  }

  const showAdjacentInvention = (offset: number) => {
    const nextIndex = selectedIndex + offset
    if (nextIndex < 0 || nextIndex >= inventions.length) return
    const invention = inventions[nextIndex]
    setSelectedInvention(invention)
    window.history.replaceState(
      null,
      '',
      `/products?invention=${encodeURIComponent(invention.id)}`,
    )
  }

  const openInvention = (invention: Invention) => {
    setSelectedInvention(invention)
    window.history.pushState(
      null,
      '',
      `/products?invention=${encodeURIComponent(invention.id)}`,
    )
  }

  const closeInvention = () => {
    setSelectedInvention(null)
    window.history.replaceState(null, '', '/products')
  }

  return (
    <div>
      <div className="rounded-[20px] border border-[#c7d4df] bg-white/80 p-3 shadow-[0_16px_50px_rgba(22,34,54,0.08)] backdrop-blur-md md:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <form onSubmit={handleSearch} className="relative flex min-w-0 flex-1">
            <Search
              aria-hidden="true"
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#718091]"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search inventions"
              aria-label="Search inventions"
              className="h-13 min-w-0 flex-1 rounded-full border border-[#d2dce4] bg-[#f4f7f9] pl-12 pr-12 text-sm text-[#162236] outline-none transition focus:border-[#4f98df] focus:bg-white focus:ring-4 focus:ring-[#0064d7]/8"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear invention search"
                className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-[#718091] transition hover:bg-[#e5ebf0] hover:text-[#162236]"
              >
                <X aria-hidden="true" size={16} />
              </button>
            )}
          </form>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void refreshCollection(query.trim(), sort)}
              disabled={isRefreshing}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#0c70df] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#075fbe] disabled:cursor-wait disabled:opacity-65 lg:hidden"
            >
              {isRefreshing && <LoaderCircle aria-hidden="true" size={17} className="animate-spin" />}
              Search
            </button>

            <label className="relative flex h-13 min-w-[190px] items-center rounded-full border border-[#d2dce4] bg-[#f4f7f9] px-4">
              {(() => {
                const SortIcon = sortOptions.find((option) => option.value === sort)?.icon || CalendarArrowDown
                return <SortIcon aria-hidden="true" size={18} className="shrink-0 text-[#0064d7]" />
              })()}
              <span className="sr-only">Sort inventions</span>
              <select
                value={sort}
                onChange={(event) => handleSort(event.target.value as InventionSort)}
                className="h-full w-full cursor-pointer appearance-none bg-transparent pl-3 pr-5 text-sm font-semibold text-[#26374a] outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute right-4 text-xs text-[#718091]">
                ⌄
              </span>
            </label>

            <button
              type="button"
              onClick={() => void refreshCollection(query.trim(), sort)}
              disabled={isRefreshing}
              className="hidden h-13 items-center justify-center gap-2 rounded-full bg-[#0c70df] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#075fbe] disabled:cursor-wait disabled:opacity-65 lg:inline-flex"
            >
              {isRefreshing && <LoaderCircle aria-hidden="true" size={17} className="animate-spin" />}
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[#5d6d7e]" aria-live="polite">
          {isRefreshing
            ? 'Updating collection…'
            : `${total} invention${total === 1 ? '' : 's'}${activeSearch ? ` matching “${activeSearch}”` : ''}`}
        </p>
        <p className="text-xs uppercase tracking-[0.14em] text-[#83909d]">
          Showing {inventions.length} of {total}
        </p>
      </div>

      {error && (
        <p className="mt-5 rounded-[16px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {inventions.length > 0 ? (
        <div className={`mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 ${isRefreshing ? 'pointer-events-none opacity-45' : ''}`}>
          {inventions.map((invention, index) => (
            <InventionCard
              key={invention.id}
              invention={invention}
              index={index}
              onOpen={() => openInvention(invention)}
            />
          ))}
        </div>
      ) : !isRefreshing ? (
        <div className="mt-8 rounded-[20px] border border-[#c7d4df] bg-white px-6 py-20 text-center">
          <Sparkles aria-hidden="true" size={42} className="mx-auto text-[#0064d7]" />
          <h2 className="mt-5 text-2xl font-bold text-[#162236]">
            {activeSearch ? 'No inventions match that search' : 'The invention archive is taking shape'}
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[#617080]">
            {activeSearch
              ? 'Try a broader phrase or clear the current search.'
              : 'Published inventions will appear here as they are added in the admin panel.'}
          </p>
          {activeSearch && (
            <button
              type="button"
              onClick={clearSearch}
              className="mt-7 inline-flex h-12 items-center rounded-full bg-[#0064d7] px-6 text-sm font-semibold text-white"
            >
              Clear search
            </button>
          )}
        </div>
      ) : null}

      {inventions.length > 0 && (
        <div className="mt-14 flex flex-col items-center" aria-live="polite">
          {nextCursor ? (
            <button
              type="button"
              onClick={loadMore}
              disabled={isLoadingMore || isRefreshing}
              className="inline-flex h-13 min-w-[210px] items-center justify-center gap-2 rounded-full border border-[#9eb7cc] bg-white px-7 font-semibold text-[#24364a] shadow-[0_10px_30px_rgba(22,34,54,0.07)] transition hover:-translate-y-0.5 hover:border-[#0064d7]/55 hover:text-[#0064d7] disabled:cursor-wait disabled:opacity-65"
            >
              {isLoadingMore && <LoaderCircle aria-hidden="true" size={19} className="animate-spin" />}
              {isLoadingMore ? 'Loading inventions' : 'Load more inventions'}
            </button>
          ) : (
            <p className="text-sm font-medium text-[#687789]">
              You’ve reached the end of the invention collection.
            </p>
          )}
        </div>
      )}

      <Dialog
        open={Boolean(selectedInvention)}
        onClose={closeInvention}
        className="relative z-[110]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[linear-gradient(90deg,rgba(6,16,31,.18),rgba(6,16,31,.68))] backdrop-blur-[1px] transition duration-300 data-closed:opacity-0 sm:top-[82px]"
        />
        <div className="fixed inset-0 flex items-end justify-end overflow-hidden pt-10 sm:top-[82px] sm:items-stretch sm:p-4 sm:pl-[18vw]">
          {selectedInvention && (
            <DialogPanel
              transition
              className="flex h-full w-full max-w-[760px] flex-col overflow-hidden rounded-t-[20px] border border-white/80 bg-[#f4f7f9] shadow-[-28px_18px_80px_rgba(3,10,20,0.28)] transition duration-300 ease-out data-closed:translate-y-full sm:rounded-[20px] sm:data-closed:translate-x-[105%] sm:data-closed:translate-y-0"
            >
              <header className="relative z-20 flex min-h-[72px] shrink-0 items-center justify-between gap-4 border-b border-[#d3dde5] bg-[#f8fafb] px-5 sm:px-7">
                <span aria-hidden="true" className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#b7c4cf] sm:hidden" />
                <div className="flex items-center gap-2">
                  <div className="mr-2 hidden sm:block">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7b8997]">
                      Product workspace
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#263b4e]">
                      Invention detail
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showAdjacentInvention(-1)}
                    disabled={selectedIndex <= 0}
                    aria-label="Show previous invention"
                    className="flex size-10 items-center justify-center rounded-[13px] border border-[#d0dae2] bg-white text-[#33485c] transition hover:border-[#8eb0cb] hover:text-[#0c70df] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronLeft aria-hidden="true" size={19} />
                  </button>
                  <button
                    type="button"
                    onClick={() => showAdjacentInvention(1)}
                    disabled={selectedIndex < 0 || selectedIndex >= inventions.length - 1}
                    aria-label="Show next invention"
                    className="flex size-10 items-center justify-center rounded-[13px] border border-[#d0dae2] bg-white text-[#33485c] transition hover:border-[#8eb0cb] hover:text-[#0c70df] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronRight aria-hidden="true" size={19} />
                  </button>
                  <span className="ml-1 hidden text-xs font-semibold tabular-nums text-[#758493] md:block">
                    {selectedIndex >= 0
                      ? `${selectedIndex + 1} of ${inventions.length}`
                      : 'Featured invention'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={closeInvention}
                  aria-label="Close invention details"
                  className="flex size-10 items-center justify-center rounded-[13px] bg-[#e7edf2] text-[#24384b] transition hover:bg-[#d9e4eb]"
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="relative h-[280px] overflow-hidden border-b border-[#ccd8e1] bg-[#dfe8ee] sm:h-[380px]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(67,104,136,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(67,104,136,.22)_1px,transparent_1px)] [background-size:32px_32px]"
                  />
                  <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-[#64b9ed]/18 blur-3xl" />
                  {selectedInvention.imageUrl ? (
                    <Image
                      src={selectedInvention.imageUrl}
                      alt={selectedInvention.title}
                      fill
                      sizes="(max-width: 760px) 100vw, 760px"
                      className="object-contain p-5 sm:p-8"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles aria-hidden="true" size={54} className="text-[#6d91ad]" />
                    </div>
                  )}
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/75 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#40566b] shadow-sm backdrop-blur-md sm:bottom-5 sm:left-5">
                    Visual record
                  </span>
                </div>

                <div className="p-6 sm:p-9 sm:pb-12">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0c70df]">
                      Invention details
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#778696]">
                      <CalendarDays aria-hidden="true" size={15} />
                      {formatFullDate(selectedInvention.createdAt)}
                    </span>
                  </div>
                  <DialogTitle className="mt-4 max-w-[650px] text-[32px] font-bold leading-[1.04] tracking-[-0.045em] text-[#101b2d] sm:text-[44px]">
                    {selectedInvention.title}
                  </DialogTitle>

                  <div className="relative mt-9 border-t border-[#d3dde5] pt-8 sm:pl-7">
                    <span aria-hidden="true" className="absolute bottom-0 left-0 top-8 hidden w-[3px] rounded-full bg-linear-to-b from-[#0c70df] via-[#55a9df] to-transparent sm:block" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.17em] text-[#405468]">
                      About this invention
                    </h3>
                    <p className="mt-4 whitespace-pre-line text-[16px] leading-8 text-[#516476]">
                      {selectedInvention.description || 'Additional product details will be added soon.'}
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          )}
        </div>
      </Dialog>
    </div>
  )
}
