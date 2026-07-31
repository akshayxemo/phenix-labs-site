import Image from 'next/image'
import Link from 'next/link'
import { CountUp } from '@/components/animations/CountUp'
import { HomeHero } from '@/components/sections/HomeHero'
import { ClientLogoMarquee } from '@/components/sections/ClientLogoMarquee'
import { HomeInventionsShowcase } from '@/components/sections/HomeInventionsShowcase'
import { HomeTestimonials } from '@/components/sections/HomeTestimonials'
import type { Testimonial } from '@/lib/data/testimonials'
import type { ClientLogo } from '@/lib/data/clients'
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  CircuitBoard,
  Code2,
  Cpu,
  GraduationCap,
  Palette,
} from 'lucide-react'

const whatWeDo = [
  {
    number: '01',
    title: 'Research',
    icon: BookOpen,
    copy: 'We explore robotics, AI, and automation to uncover practical ideas that can shape tomorrow’s products.',
    accent: '#58a7ff',
  },
  {
    number: '02',
    title: 'Development',
    icon: Boxes,
    copy: 'We turn promising concepts into dependable hardware and software, from early prototypes through production.',
    accent: '#ff9a43',
  },
  {
    number: '03',
    title: 'Education',
    icon: GraduationCap,
    copy: 'We make modern technology approachable through hands-on learning in robotics, AI, and automation.',
    accent: '#a984ff',
  },
]

const services = [
  {
    number: '01',
    title: 'PCB Design',
    eyebrow: 'Hardware engineering',
    description:
      'Production-ready circuit boards shaped around performance, reliability, and manufacturability.',
    tags: ['Schematic', 'Layout', 'DFM'],
    icon: CircuitBoard,
    accent: '#45c9e8',
    span: 'lg:col-span-7',
    theme: 'dark',
  },
  {
    number: '02',
    title: 'Firmware Development',
    eyebrow: 'Embedded systems',
    description:
      'Responsive, maintainable firmware that connects hardware behavior with real product needs.',
    tags: ['Embedded C', 'IoT', 'RTOS'],
    icon: Cpu,
    accent: '#ff9a43',
    span: 'lg:col-span-5',
    theme: 'light',
  },
  {
    number: '03',
    title: 'Web Development',
    eyebrow: 'Digital products',
    description:
      'Fast, scalable interfaces and platforms designed to make complex workflows feel effortless.',
    tags: ['Web Apps', 'APIs', 'Dashboards'],
    icon: Code2,
    accent: '#a984ff',
    span: 'lg:col-span-5',
    theme: 'light',
  },
  {
    number: '04',
    title: 'Prototyping & Testing',
    eyebrow: 'Product validation',
    description:
      'Tangible prototypes and focused testing that expose risk early and accelerate confident decisions.',
    tags: ['Rapid Build', 'Validation', 'Iteration'],
    icon: Palette,
    accent: '#52c9ee',
    span: 'lg:col-span-7',
    theme: 'dark',
  },
]

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-[760px] text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0064d7]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[36px] font-bold leading-[1.05] tracking-[-0.035em] text-black md:text-[52px]">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-[680px] text-[16px] leading-8 text-[#4e4e4e] md:text-[18px]">
        {children}
      </p>
    </div>
  )
}

interface HomePageContentProps {
  testimonials: Testimonial[]
  clients: ClientLogo[]
}

export function HomePageContent({ testimonials, clients }: HomePageContentProps) {
  return (
    <div className="overflow-hidden bg-[#ecf1f5] text-[#040404]">
      <HomeHero />

      <ClientLogoMarquee clients={clients} />

      <section className="relative z-10 px-4 pb-14 pt-8 md:px-6.75 md:pb-16 md:pt-11" aria-label="Company highlights">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-b from-transparent to-[#dce8f2]/70"
        />
        <div className="relative mx-auto max-w-[1240px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#58a7ff]/8 blur-3xl"
          />
          <div className="relative grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
            {[
              { value: 150, suffix: ' +', label: 'Designs Completed', color: '#d97822' },
              { value: 50, suffix: ' +', label: 'Happy Clients', color: '#7957cf' },
              { value: 12, suffix: ' +', label: 'Years of Experience', color: '#168ab3' },
              { value: 2, suffix: ' +', label: 'Years in Business', color: '#5961cc' },
            ].map(({ value, suffix, label, color }, index) => (
              <div
                key={label}
                className={`relative flex min-h-[116px] flex-col items-center justify-center px-3 text-center md:min-h-[138px] md:px-6 ${
                  index < 3
                    ? 'md:after:absolute md:after:right-0 md:after:top-1/2 md:after:block md:after:h-24 md:after:w-px md:after:-translate-y-1/2 md:after:bg-linear-to-b md:after:from-transparent md:after:via-[#70879b] md:after:to-transparent'
                    : ''
                } ${
                  index % 2 === 0
                    ? 'after:absolute after:right-0 after:top-1/2 after:h-20 after:w-px after:-translate-y-1/2 after:bg-linear-to-b after:from-transparent after:via-[#70879b]/90 after:to-transparent'
                    : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className="mb-5 h-[3px] w-10 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <strong className="text-[40px] font-bold leading-none tracking-[-0.04em] text-[#162236] tabular-nums md:text-[52px]">
                  <CountUp value={value} suffix={suffix} delay={index * 0.12} />
                </strong>
                <span className="mt-3 max-w-[150px] text-[12px] font-semibold leading-5 text-[#596b7e] sm:text-sm md:text-[15px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-10 px-4 pb-4 pt-0 md:-mt-12 md:px-5.5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-28 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2187e8]/16 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1396px] overflow-hidden rounded-[20px] bg-linear-to-tr from-[#07101c] from-70% to-[#173E6E] px-6 py-14 text-white shadow-[0_28px_75px_rgba(25,54,86,0.16)] md:px-[78px] md:py-[72px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-px w-3/5 -translate-x-1/2 bg-linear-to-r from-transparent via-[#58a7ff]/85 to-transparent"
          />
          <Image src="/images/home/what-we-do.jpg" alt="" fill className="object-cover opacity-[.08]" sizes="100vw" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#58a7ff]">
                What We Do
              </p>
              <h2 className="mt-4 max-w-[560px] text-[36px] font-bold leading-[1.05] tracking-[-0.035em] md:text-[52px]">
                Turning Ideas Into Reality
              </h2>
            </div>
            <p className="max-w-[690px] text-[16px] leading-8 text-[#aeb9c7] md:text-[18px]">
              We bring research, product development, and practical education
              together under one roof—creating useful technology while helping
              the next generation understand how it works.
            </p>
          </div>
          <div className="relative z-10 mt-11 grid gap-4 md:grid-cols-3">
            {whatWeDo.map(({ number, title, icon: Icon, copy, accent }) => (
              <article
                key={title}
                className="group relative min-h-[290px] overflow-hidden rounded-[20px] border border-white/[0.09] bg-white/[0.035] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.06] md:p-8"
              >
                <span className="absolute right-6 top-4 text-[58px] font-bold leading-none text-white/[0.035] transition-colors group-hover:text-white/[0.06]">
                  {number}
                </span>
                <span
                  className="flex size-14 items-center justify-center rounded-full border"
                  style={{
                    backgroundColor: `${accent}14`,
                    borderColor: `${accent}3d`,
                    color: accent,
                  }}
                >
                  <Icon aria-hidden="true" size={27} strokeWidth={1.8} />
                </span>
                <h3 className="mt-8 text-[27px] font-bold leading-tight tracking-[-0.025em] md:text-[32px]">
                  {title}
                </h3>
                <p className="mt-3 max-w-[360px] text-[15px] leading-7 text-[#aeb9c7] md:text-[16px]">
                  {copy}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: accent }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-[100px]">
        <SectionIntro eyebrow="What we build" title="Our Services">
          From the first circuit to the final interface, we build connected
          solutions that are ready for the real world.
        </SectionIntro>
        <div className="mx-auto mt-14 grid max-w-[1236px] gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {services.map(({
            number,
            title,
            eyebrow,
            description,
            tags,
            icon: Icon,
            accent,
            span,
            theme,
          }) => {
            const isDark = theme === 'dark'

            return (
              <Link
                key={title}
                href="/services#engineering-services"
                aria-label={`Explore ${title}`}
                className={`group relative flex min-h-[320px] overflow-hidden rounded-[20px] border p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(22,34,54,0.16)] md:p-9 ${span} ${
                  isDark
                    ? 'border-[#263b54] bg-[#111d2d] text-white'
                    : 'border-[#c5d1db] bg-white text-[#111827]'
                }`}
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-20 size-60 rounded-full opacity-[0.16] blur-3xl transition-transform duration-700 group-hover:scale-125"
                  style={{ backgroundColor: accent }}
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 opacity-[0.055] ${
                    isDark
                      ? 'bg-[linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)]'
                      : 'bg-[linear-gradient(rgba(22,34,54,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(22,34,54,.8)_1px,transparent_1px)]'
                  } bg-size-[34px_34px]`}
                />

                <div className="relative z-10 flex w-full flex-col">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <span
                        className="flex size-14 items-center justify-center rounded-[16px] border"
                        style={{
                          backgroundColor: `${accent}18`,
                          borderColor: `${accent}45`,
                          color: accent,
                        }}
                      >
                        <Icon aria-hidden="true" size={29} strokeWidth={1.8} />
                      </span>
                      <div>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
                            isDark ? 'text-[#91a1b5]' : 'text-[#708093]'
                          }`}
                        >
                          {eyebrow}
                        </span>
                        <p
                          className="mt-1 text-xs font-bold tabular-nums"
                          style={{ color: accent }}
                        >
                          / {number}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`flex size-11 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 ${
                        isDark
                          ? 'border-[#3b4b60] bg-white/5 text-white'
                          : 'border-[#d2dce4] bg-[#f3f6f8] text-[#162236]'
                      }`}
                    >
                      <ArrowUpRight aria-hidden="true" size={20} />
                    </span>
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className="max-w-[560px] text-[26px] font-bold leading-[1.12] tracking-[-0.025em] md:text-[32px]">
                      {title}
                    </h3>
                    <p
                      className={`mt-3 max-w-[560px] text-[15px] leading-7 md:text-[16px] ${
                        isDark ? 'text-[#aeb9c7]' : 'text-[#5b697a]'
                      }`}
                    >
                      {description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                            isDark
                              ? 'border-[#34465c] bg-white/[0.04] text-[#c6d0dc]'
                              : 'border-[#d4dde5] bg-[#f3f6f8] text-[#526071]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="group inline-flex h-[52px] items-center gap-2 rounded-full bg-[#0064d7] px-8 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0055b8] hover:shadow-[0_14px_35px_rgba(0,100,215,0.25)]"
          >
            Explore all services
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              size={18}
            />
          </Link>
        </div>
      </section>

      <HomeInventionsShowcase />

      <HomeTestimonials testimonials={testimonials} />
    </div>
  )
}
