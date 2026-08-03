import type { Metadata } from 'next'
import { Atom, Boxes, CircuitBoard, Sparkles } from 'lucide-react'
import { JsonLd } from '@/components/common/JsonLd'
import { MainLayout } from '@/components/layout/MainLayout'
import { InventionsCatalogue } from '@/components/sections/InventionsCatalogue'
import { getFooterData, getNavbarData } from '@/lib/config/site'
import {
  getInventionById,
  getInventionsPage,
} from '@/lib/data/inventions'
import {
  generateMetadata,
  getBreadcrumbSchema,
  getInventionCollectionSchema,
  getWebPageSchema,
} from '@/lib/seo'

/** Products route with paginated catalogue data and deep-linked invention details. */
export const metadata: Metadata = generateMetadata({
  title: 'Inventions, Prototypes & Engineered Products',
  description:
    'Explore inventions, research experiments, prototypes, and engineered products developed by Phenix Labs, ordered by their project dates.',
  keywords: [
    'Phenix Labs inventions',
    'engineering prototypes',
    'product development',
    'technology experiments',
  ],
  path: '/products',
})

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ invention?: string | string[] }>
}) {
  const resolvedSearchParams = await searchParams
  // A deep link may arrive before its item appears in the first catalogue page.
  const requestedInventionId = Array.isArray(resolvedSearchParams.invention)
    ? resolvedSearchParams.invention[0]
    : resolvedSearchParams.invention
  const [navbar, footer, initialPage, initialSelectedInvention] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getInventionsPage().catch((error) => {
      console.warn('[Sanity] Could not load the initial invention collection.', error)
      return { items: [], nextCursor: null, total: 0 }
    }),
    requestedInventionId
      ? getInventionById(requestedInventionId)
      : Promise.resolve(null),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <JsonLd
        data={[
          getWebPageSchema({
            title: 'Inventions and Products',
            description:
              'A growing catalogue of inventions, prototypes, experiments, and engineered products.',
            path: '/products',
            type: 'CollectionPage',
          }),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
          ]),
          getInventionCollectionSchema(initialPage.items),
        ]}
      />
      <div className="overflow-hidden bg-[#eaf0f4] text-[#08111f]">
        {/* Products hero and animated engineering orbit. */}
        <section className="relative overflow-hidden bg-[#081321] px-5 py-18 text-white md:py-24 lg:py-28">
          <div aria-hidden="true" className="absolute -left-52 -top-56 size-[620px] rounded-full bg-[#0064d7]/25 blur-[130px]" />
          <div aria-hidden="true" className="absolute -bottom-56 right-[8%] size-[480px] rounded-full bg-[#46b6e4]/16 blur-[120px]" />

          <div className="relative mx-auto grid max-w-[1236px] gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-[#65afff]">
                <Sparkles aria-hidden="true" size={16} />
                Ideas made tangible
              </p>
              <h1 className="mt-6 max-w-[820px] text-[48px] font-bold leading-[0.96] tracking-[-0.055em] sm:text-[62px] md:text-[78px]">
                Inventions shaped through{' '}
                <span className="bg-linear-to-r from-[#58a7ff] via-[#64d4ef] to-[#9aabff] bg-clip-text text-transparent">
                  curiosity and engineering.
                </span>
              </h1>
              <p className="mt-7 max-w-[690px] text-[17px] leading-8 text-[#aebbc9] md:text-[19px]">
                A growing archive of prototypes, experiments, and engineered
                products—each one built to explore an idea, test a principle,
                or solve a real-world problem.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {[
                  { icon: CircuitBoard, label: 'Engineered systems' },
                  { icon: Boxes, label: 'Physical prototypes' },
                  { icon: Atom, label: 'Research experiments' },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-sm font-medium text-[#c7d2de] backdrop-blur-sm"
                  >
                    <Icon aria-hidden="true" size={16} className="text-[#65afff]" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto hidden aspect-square w-full max-w-[500px] lg:block">
              <div className="product-orbit product-orbit-outer absolute inset-[8%] rounded-full border border-dashed border-[#65afff]/25">
                <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#58a7ff] shadow-[0_0_16px_#58a7ff]" />
                <span className="absolute left-[93.3%] top-3/4 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#58a7ff] shadow-[0_0_12px_#58a7ff]" />
                <span className="absolute left-[6.7%] top-3/4 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#58a7ff] shadow-[0_0_12px_#58a7ff]" />
              </div>
              <div className="product-orbit product-orbit-middle absolute inset-[22%] rounded-full border border-[#65afff]/18">
                <span className="absolute right-0 top-1/2 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#64d4ef] shadow-[0_0_14px_#64d4ef]" />
                <span className="absolute left-0 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#64d4ef] shadow-[0_0_14px_#64d4ef]" />
              </div>
              <div className="product-orbit product-orbit-inner absolute inset-[34%] rounded-full bg-[#0f2a45] shadow-[0_0_80px_rgba(55,160,255,0.22)]">
                <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#9aabff] shadow-[0_0_14px_#9aabff]" />
              </div>
              <div className="absolute inset-[40%] flex items-center justify-center rounded-full border border-[#65afff]/35 bg-[#10243b] text-[#71b4ff] shadow-[inset_0_0_28px_rgba(88,167,255,0.12)]">
                <CircuitBoard aria-hidden="true" className="size-12" strokeWidth={1.4} />
              </div>

              {[
                { className: 'left-[3%] top-[43%]', number: '01', text: 'Observe' },
                { className: 'right-[4%] top-[18%]', number: '02', text: 'Prototype' },
                { className: 'bottom-[8%] right-[14%]', number: '03', text: 'Validate' },
              ].map((item) => (
                <div
                  key={item.number}
                  className={`absolute ${item.className} min-w-[132px] rounded-[18px] border border-white/10 bg-[#0c1c2e]/85 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-md`}
                >
                  <span className="text-[10px] font-bold tracking-[0.16em] text-[#5d91c8]">/ {item.number}</span>
                  <p className="mt-1.5 text-sm font-semibold text-white">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Searchable, paginated invention collection. */}
        <section className="relative px-5 py-16 md:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.2] [background-image:radial-gradient(rgba(56,91,123,.42)_1px,transparent_1.2px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_84%,transparent)]"
          />
          <div className="relative mx-auto max-w-[1236px]">
            <div className="mb-10 max-w-[760px]">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#0064d7]">
                The collection
              </p>
              <h2 className="mt-4 text-[38px] font-bold leading-[1.02] tracking-[-0.045em] text-[#101b2d] md:text-[56px]">
                Explore what we have brought to life.
              </h2>
              <p className="mt-5 text-[16px] leading-8 text-[#586a7b] md:text-[18px]">
                Search the archive or change its order. New published work
                appears automatically from the admin panel.
              </p>
            </div>

            <InventionsCatalogue
              initialPage={initialPage}
              initialSelectedInvention={initialSelectedInvention}
            />
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
