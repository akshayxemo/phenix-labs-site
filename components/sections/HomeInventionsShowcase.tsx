'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const inventions = [
  {
    number: '01',
    title: 'Lunar Surface Lamp',
    category: 'Additive manufacturing',
    description:
      'A tactile moon-inspired light study shaped through digital fabrication and material experimentation.',
    image: '/images/home/invention-1.png',
    layout: 'lg:col-span-7 lg:row-span-2 lg:min-h-[620px]',
    featured: true,
  },
  {
    number: '02',
    title: 'Wearable Concept Prototype',
    category: 'Rapid prototyping',
    description:
      'Form, proportion, and assembly explored quickly through an iterative physical model.',
    image: '/images/home/invention-2.png',
    layout: 'lg:col-span-5 lg:min-h-[300px]',
    featured: false,
  },
  {
    number: '03',
    title: 'Autonomous Rover Platform',
    category: 'Robotics',
    description:
      'A compact mobile platform designed for sensing, control, and autonomous experiments.',
    image: '/images/home/invention-3.png',
    layout: 'lg:col-span-5 lg:min-h-[300px]',
    featured: false,
  },
  {
    number: '04',
    title: 'Smart Sample Scanner',
    category: 'Embedded product',
    description:
      'A focused interaction concept combining a physical control surface with an embedded display.',
    image: '/images/home/invention-4.png',
    layout: 'lg:col-span-12 lg:min-h-[340px]',
    featured: false,
  },
]

export function HomeInventionsShowcase() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="px-4 pb-24 md:px-5.5 md:pb-[110px]">
      <div className="relative mx-auto max-w-[1396px] overflow-hidden rounded-[20px] bg-[#07101c] px-5 py-14 text-white md:px-12 md:py-18 lg:px-[72px]">
        <div
          aria-hidden="true"
          className="absolute -left-40 top-16 size-[420px] rounded-full bg-[#0064d7]/15 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-44 bottom-8 size-[380px] rounded-full bg-[#a984ff]/10 blur-[110px]"
        />

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[760px]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#58a7ff]">
              Ideas made tangible
            </p>
            <h2 className="mt-4 text-[38px] font-bold leading-[1.04] tracking-[-0.04em] md:text-[58px]">
              Our Inventions
            </h2>
            <p className="mt-5 max-w-[680px] text-[16px] leading-8 text-[#9fabb9] md:text-[18px]">
              Experiments, prototypes, and engineered objects that turn
              curiosity into something people can see, touch, and test.
            </p>
          </div>
          <Link
            href="/cases"
            className="group inline-flex w-fit items-center gap-2 border-b border-[#536274] pb-2 text-sm font-semibold text-white transition-colors hover:border-[#58a7ff] hover:text-[#58a7ff]"
          >
            Explore our work
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
              },
            },
          }}
          className="relative z-10 mt-12 grid gap-4 lg:grid-cols-12"
        >
          {inventions.map((invention) => (
            <motion.article
              key={invention.title}
              variants={{
                hidden: shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 38, scale: 0.985 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: shouldReduceMotion ? 0 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className={`group relative min-h-[390px] overflow-hidden rounded-[20px] border border-white/10 bg-[#111d2d] ${invention.layout}`}
            >
              <Image
                src={invention.image}
                alt={invention.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                sizes={
                  invention.featured
                    ? '(max-width: 1024px) 100vw, 58vw'
                    : '(max-width: 1024px) 100vw, 45vw'
                }
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#020712] via-[#07101c]/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-linear-to-r from-[#020712]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#07101c]/55 px-3 py-1.5 text-xs font-bold tabular-nums text-white backdrop-blur-md md:left-7 md:top-7">
                / {invention.number}
              </span>

              <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#71b4ff]">
                  {invention.category}
                </p>
                <div className="mt-3 flex items-end justify-between gap-5">
                  <div className={invention.featured ? 'max-w-[590px]' : 'max-w-[520px]'}>
                    <h3
                      className={`font-bold leading-tight tracking-[-0.025em] ${
                        invention.featured
                          ? 'text-[30px] md:text-[42px]'
                          : 'text-[25px] md:text-[30px]'
                      }`}
                    >
                      {invention.title}
                    </h3>
                    <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#b5c0cd] transition-colors group-hover:text-[#d7dee7] md:text-[15px]">
                      {invention.description}
                    </p>
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:border-[#58a7ff] group-hover:bg-[#0064d7]">
                    <ArrowUpRight aria-hidden="true" size={19} />
                  </span>
                </div>
              </div>

              <Link
                href="/cases"
                aria-label={`View ${invention.title}`}
                className="absolute inset-0 z-20 rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#58a7ff]"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
