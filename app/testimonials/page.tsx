import type { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { TestimonialsArchive } from '@/components/sections/TestimonialsArchive'
import { getFooterData, getNavbarData } from '@/lib/config/site'
import { getTestimonialsPage } from '@/lib/data/testimonials'

export const metadata: Metadata = {
  title: 'Client Testimonials | Phenix Labs',
  description:
    'Read what clients say about collaborating with Phenix Labs on engineering, product development, and technology projects.',
}

export default async function TestimonialsPage() {
  const [navbar, footer, initialPage] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getTestimonialsPage(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <section className="relative overflow-hidden bg-[#162236] px-5 py-20 text-white md:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(158,193,222,.42)_1px,transparent_1px),linear-gradient(90deg,rgba(158,193,222,.42)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_96%)]"
        />
        <div className="absolute -right-28 -top-36 size-[430px] rounded-full bg-[#0064d7]/25 blur-3xl" />
        <div className="absolute -bottom-48 left-[8%] size-[360px] rounded-full bg-[#a984ff]/15 blur-3xl" />
        <div className="relative mx-auto max-w-[980px] text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#58a7ff]">
            Voices of collaboration
          </p>
          <h1 className="mt-5 text-[42px] font-bold leading-[1.02] tracking-[-0.04em] md:text-[68px]">
            Built Together. Proven Through Experience.
          </h1>
          <p className="mx-auto mt-7 max-w-[720px] text-[17px] leading-8 text-[#c4cfda] md:text-[19px]">
            Every story reflects a challenge understood, a solution shaped,
            and a partnership carried through with care.
          </p>
        </div>
      </section>

      <section className="bg-[#ecf1f5] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[1236px]">
          <TestimonialsArchive initialPage={initialPage} />
        </div>
      </section>
    </MainLayout>
  )
}
