import Image from 'next/image'
import Link from 'next/link'
import { CountUp } from '@/components/animations/CountUp'
import {
  BookOpen,
  Boxes,
  CircuitBoard,
  Code2,
  Cpu,
  GraduationCap,
  Palette,
  Star,
} from 'lucide-react'

const whatWeDo = [
  {
    title: 'Research',
    icon: BookOpen,
    copy: 'Welcome to the forefront of innovation at Phenix Labs. Our R&D team pioneers advancements in robotics, AI, and automation, shaping the future of technology. With a commitment to pushing boundaries, we lead the industry with creative, intelligent solutions that redefine possibilities.',
  },
  {
    title: 'Development',
    icon: Boxes,
    copy: 'Phenix Labs is your premier partner for end-to-end innovation. Specializing in both product development and manufacturing, we bring your ideas to life. From conceptualization to production, we excel in crafting cutting-edge solutions in robotics, AI, and automation.',
  },
  {
    title: 'Education',
    icon: GraduationCap,
    copy: 'At Phenix Labs, we empower students with cutting-edge training in modern tech. Our programs focus on robotics, AI, and automation, providing hands-on experiences for a dynamic learning journey. Join us to equip the next generation for success in the rapidly evolving world of technology.',
  },
]

const services = [
  { title: 'PCB Design', icon: CircuitBoard, color: '#45c9e8' },
  { title: 'Firmware Development', icon: Cpu, color: '#ff9a43' },
  { title: 'Web & Development', icon: Code2, color: '#a984ff' },
  { title: 'Prototyping & Testing', icon: Palette, color: '#52c9ee' },
]

const inventions = [
  { image: '/images/home/invention-1.png', tone: 'bg-[#1b3d70] text-white', imageFirst: true },
  { image: '/images/home/invention-2.png', tone: 'bg-white text-[#040404]', imageFirst: false },
  { image: '/images/home/invention-3.png', tone: 'bg-white text-[#040404]', imageFirst: true },
  { image: '/images/home/invention-4.png', tone: 'bg-[#f0c74b] text-[#040404]', imageFirst: false },
]

const testimonials = [
  ['"They bring vision and creativity. The PCB designing work, prototyping and the final build were delivered with precision and great attention to detail."', 'Aryan Krishna', 'Product Designer', '4.8'],
  ['"We were impressed by their technical expertise, professionalism and willingness to go the extra mile. A dependable team for complex product development."', 'Vishnu Sankar', 'Research Scholar', '4.8'],
  ['"Professional service and beyond. They delivered the 3D printing work perfectly and helped us set up a motion activated sensor system for an art installation."', 'Koushik Chatterjee', 'Interior Designer', '4.9'],
]

function SectionIntro({ title, children, dark = false }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-[903px] text-center">
      <h2 className={`text-[32px] font-bold leading-tight md:text-[48px] ${dark ? 'text-white' : 'text-black'}`}>{title}</h2>
      <p className={`mt-4 text-sm leading-relaxed md:text-[20px] ${dark ? 'text-[#aeaeae]' : 'text-[#4e4e4e]'}`}>{children}</p>
    </div>
  )
}

export function HomePageContent() {
  return (
    <div className="overflow-hidden bg-[#ecf1f5] text-[#040404]">
      <section className="relative h-[540px] md:h-[559px]">
        <Image
          src="/images/home/hero-bg.png"
          alt="Robotic hands reaching toward one another"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center px-5 pt-[110px] text-center md:pt-[116px]">
          <h1 className="max-w-[680px] text-[42px] font-bold leading-[.98] tracking-[-0.04em] text-black md:text-[64px]">
            Join With Our Crazy<br />Invention
          </h1>
          <p className="mt-7 max-w-[553px] text-sm leading-[1.55] text-[#4e4e4e] md:text-[20px]">
            Sometimes a technology is so awe-inspiring that the imagination runs away with it - often far, far away from reality.
          </p>
          <Link href="/cases" className="mt-8 inline-flex h-[57px] min-w-[211px] items-center justify-center rounded-full bg-[#0064d7] px-8 text-[20px] font-medium text-white transition-transform hover:scale-[1.03]">
            Our Work
          </Link>
        </div>
      </section>

      <section className="px-4 pb-6 md:px-[27px]">
        <div className="mx-auto grid max-w-[1396px] grid-cols-2 rounded-[20px] bg-[#162236] px-3 py-7 md:grid-cols-4 md:px-0 md:py-[27px]">
          {[
            { value: 150, suffix: ' +', label: 'Design Executed', color: '#ffa143' },
            { value: 50, suffix: ' +', label: 'Happy Clients', color: '#a984ff' },
            { value: 12, suffix: '', label: 'Years Of Experience', color: '#4fc6f2' },
            { value: 2, suffix: '', label: 'Years Into The Business', color: '#8b90ff' },
          ].map(({ value, suffix, label, color }, index) => (
            <div key={label} className={`flex min-h-[104px] flex-col items-center justify-center text-center ${index % 2 ? 'border-l border-[#3d4c65]' : ''} md:border-l md:first:border-l-0`}>
              <strong className="text-[36px] leading-none tabular-nums md:text-[48px]" style={{ color }}>
                <CountUp value={value} suffix={suffix} delay={index * 0.12} />
              </strong>
              <span className="mt-3 text-sm text-white md:text-[24px]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-5 md:px-[22px]">
        <div className="relative mx-auto max-w-[1396px] overflow-hidden rounded-[20px] bg-linear-to-tr from-[#07101c] from-70% to-[#173E6E] px-6 py-14 text-white md:px-[78px] md:py-[72px]">
          <Image src="/images/home/what-we-do.jpg" alt="" fill className="object-cover opacity-[.08]" sizes="100vw" />
          <div className="relative z-10 text-center">
            <p className="text-[18px] font-medium uppercase tracking-[.45em] text-[#3c99ff] md:text-[20px]">What We Do</p>
            <h2 className="mt-2 text-[34px] font-bold md:text-[48px]">Turning Dreams Into Reality</h2>
            <p className="mx-auto mt-5 max-w-[1128px] text-sm leading-[1.55] text-[#aeaeae] md:text-[18px]">
              Welcome to Phenix Labs, a cutting-edge company at the forefront of robotics, research and development, and education. Established in 2020, we pride ourselves on pushing the boundaries of innovation to create transformative solutions that shape the future of technology. Beyond our commitment to excellence in robotics, Phenix Labs is dedicated to imparting knowledge to young minds. We actively engage in teaching science and robotics to children, fostering a passion for learning and innovation among the next generation.
            </p>
          </div>
          <div className="relative z-10 mt-10 grid gap-4 md:grid-cols-3">
            {whatWeDo.map(({ title, icon: Icon, copy }) => (
              <article key={title} className="min-h-[330px] rounded-[20px] border border-[#26344a] last:bg-linear-to-br last:from-[#111d2d]/40 last:from-70% last:to-red-600/30 not-last:bg-[#111d2d]/40 p-7">
                <span className="flex size-[68px] items-center justify-center rounded-[10px] bg-[#0064d7] text-white"><Icon size={38} /></span>
                <h3 className="mt-5 text-[28px] font-bold md:text-[36px]">{title}</h3>
                <p className="mt-2 text-[16px] leading-[1.55] text-[#aeaeae] md:text-[18px]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-[100px]">
        <SectionIntro title="Our Services">We&apos;re continually improving due to client feedback and working each day to improve our data and technology.</SectionIntro>
        <div className="mx-auto mt-12 grid max-w-[1236px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, icon: Icon, color }) => (
            <article key={title} className="min-h-[200px] rounded-[20px] border border-[#baccdb] bg-white p-6">
              <span className="flex size-11 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}22`, color }}><Icon size={26} /></span>
              <h3 className="mt-5 text-[18px] font-bold">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4e4e4e]">We bring ideas to life with carefully engineered, reliable solutions designed for real-world use.</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center"><Link href="/services" className="inline-flex h-[44px] items-center rounded-full border-2 border-[#0064d7] px-8 font-medium text-[#0064d7]">See More</Link></div>
      </section>

      <section className="px-5 pb-[100px]">
        <SectionIntro title="Our Inventions">We&apos;re continually improving due to client feedback and working each day to improve our data and technology.</SectionIntro>
        <div className="mx-auto mt-12 grid max-w-[1236px] overflow-hidden rounded-[20px] md:grid-cols-2">
          {inventions.map(({ image, tone, imageFirst }, index) => (
            <article key={image} className={`grid min-h-[520px] grid-rows-2 ${tone}`}>
              <div className={`relative ${imageFirst ? 'order-1' : 'order-2'}`}><Image src={image} alt={`Phenix Labs invention ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className={`${imageFirst ? 'order-2' : 'order-1'} flex flex-col justify-center p-8 md:p-12`}>
                <h3 className="max-w-[430px] text-[26px] font-bold leading-[1.12]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                <p className="mt-4 max-w-[500px] text-sm leading-relaxed opacity-80">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.</p>
                <Link href="/cases" className="mt-5 self-end text-[13px] font-extrabold text-[#3c99ff]">VIEW IN DETAILS &gt;&gt;</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e0e8ef] px-5 py-20 md:py-[90px]">
        <SectionIntro title="What Our Clients Say About Us">Our mission is to drive progress and enhance the lives of our customers by delivering superior products and services that exceed expectations.</SectionIntro>
        <div className="mx-auto mt-12 grid max-w-[1236px] gap-4 md:grid-cols-3">
          {testimonials.map(([quote, name, role, rating]) => (
            <article key={name} className="flex min-h-[240px] flex-col rounded-[20px] border border-[#baccdb] bg-white p-6">
              <p className="text-[15px] leading-relaxed text-[#4e4e4e]">{quote}</p>
              <div className="mt-auto flex items-end justify-between pt-4">
                <div><h3 className="text-[18px] font-semibold">{name}</h3><p className="text-[15px] text-[#4e4e4e]">{role}</p></div>
                <span className="flex items-center gap-2 text-[18px] font-medium">{rating}<Star size={19} fill="#f0c74b" color="#f0c74b" /></span>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center gap-2"><i className="size-2 rounded-full bg-[#0064d7]" /><i className="size-2 rounded-full bg-[#baccdb]" /><i className="size-2 rounded-full bg-[#baccdb]" /></div>
      </section>
    </div>
  )
}
