import Image from 'next/image'
import Link from 'next/link'
import {
  AlarmClock,
  BookOpen,
  Boxes,
  CircuitBoard,
  Code2,
  Cpu,
  GraduationCap,
  MapPin,
  Palette,
  Phone,
} from 'lucide-react'

const categories = [
  {
    number: '01',
    title: 'Academic & Research',
    icon: BookOpen,
    description: 'Accelerating research through custom instrumentation, rapid prototyping, and collaborative engineering.',
    accent: '#ff895d',
    benefits: ['Research-focused engineering', 'Rapid prototype development', 'Iterative development with researcher feedback', 'Interdisciplinary expertise', 'Laboratory to real-world deployment'],
    tags: ['Research Instrumentation', 'Embedded Systems', 'AI & Edge Computing'],
  },
  {
    number: '02',
    title: 'Industrial',
    icon: Boxes,
    description: 'Building reliable and scalable engineering solutions for automation, manufacturing, and industrial applications.',
    accent: '#ffc85d',
    benefits: ['Industry-ready solutions', 'Rapid prototyping to production', 'End-to-end product development', 'Innovation-driven engineering', 'Design for manufacturing (DFM)'],
    tags: ['Instrumentation & Control', 'Industrial IoT', 'Robotics'],
  },
]

const processSteps = [
  ['01', 'Concept', 'Consultation', 'Initial idea, define requirement, scope and feasibility.'],
  ['02', 'Strategy', 'Concept Development', 'Feasibility analysis and architecture planning.'],
  ['03', 'Creation', 'Design', 'Product schematics, CAD and software architecture.'],
  ['06', 'Launch', 'Deployment & Support', 'Final documentation, training and on-site delivery support.'],
  ['05', 'Refine', 'Testing & Iteration', 'Rigorous testing and performance tuning.'],
  ['04', 'Build', 'Prototype', 'Physical build and preliminary functional validation.'],
]

const engineeringServices = [
  { title: 'PCB Design', icon: CircuitBoard, color: '#45c9e8', copy: 'High-performance multilayer board design and layout for complex systems.' },
  { title: 'Firmware Development', icon: Cpu, color: '#ff895d', copy: 'Reliable low-level code for sensors, controllers and embedded hardware.' },
  { title: 'Edge AI Development', icon: Code2, color: '#a984ff', copy: 'Deploying intelligence to constrained devices and real-time edge systems.' },
  { title: 'Prototyping & Testing', icon: Palette, color: '#4fc6f2', copy: 'Rapid iteration and rigorous functional validation for every build.' },
  { title: 'CAD & 3D Printing', icon: Boxes, color: '#52cbb5', copy: 'Industrial CAD design with rapid and functional prototyping.' },
  { title: 'Product Design', icon: GraduationCap, color: '#f0a66b', copy: 'Full-cycle industrial design and engineering from concept to product.' },
  { title: 'System Integration', icon: BookOpen, color: '#a984ff', copy: 'Connecting electronics, software and mechanical systems into one solution.' },
  { title: 'Instrumentation Design', icon: AlarmClock, color: '#67aaf9', copy: 'Custom laboratory and industrial tools engineered for reliable insights.' },
]

const contactDetails = [
  { icon: Phone, title: 'Contact', detail: <>Mobile: +91 8961548205<br />Mail: gyankrishna@phenixlabs.in</> },
  { icon: AlarmClock, title: 'Working Hours', detail: <>Monday - Friday 08:00 - 17:00<br />Saturday & Sunday 08:00 - 12:00</> },
  { icon: MapPin, title: 'Address', detail: <>TC 6/215/NLRA 135, Neerazhi Line, Ulloor,<br />Thiruvananthapuram 695011</> },
]

export function ServicesPageContent() {
  return (
    <div className="overflow-hidden bg-[#ecf1f5] text-[#040404]">
      <section className="relative min-h-[577px] bg-white px-5">
        <div className="relative mx-auto min-h-[577px] max-w-[1010px]">
          <div className="relative z-10 max-w-[740px] pt-[110px] md:pt-[105px]">
            <h1 className="text-[42px] font-bold leading-[1.08] tracking-[-.03em] md:text-[64px]">
              Engineering Solutions by<br /><span className="text-[#3c99ff]">Phenix Labs</span>
            </h1>
            <p className="mt-7 max-w-[721px] text-sm leading-[1.55] text-[#4e4e4e] md:text-[20px]">
              Phenix Labs partners with industries, research organizations, and academic institutions to transform ideas into reliable engineering solutions. From custom electronics and embedded systems to rapid prototyping and product development, we provide end-to-end support from concept to deployment.
            </p>
          </div>
          <Image src="/images/services-hero.png" alt="Engineering system blueprint" width={500} height={496} priority className="absolute -right-[85px] bottom-3 hidden h-[496px] w-[500px] object-contain lg:block" />
        </div>
      </section>

      <section className="bg-[#0a101d] px-5 py-[106px] text-white">
        <div className="mx-auto grid max-w-[1010px] gap-[31px] md:grid-cols-2">
          {categories.map(({ number, title, icon: Icon, description, accent, benefits, tags }) => (
            <article key={title} className="min-h-[546px] border border-[#1a2537] bg-[#121b2b] p-10">
              <div className="flex items-start justify-between"><span className="text-[40px] font-black text-[#57a5ff]/30">{number}</span><Icon size={34} className="text-[#3c99ff]" /></div>
              <h2 className="mt-1 text-[28px] font-bold">{title}</h2>
              <p className="mt-3 min-h-[54px] text-[13px] leading-relaxed text-[#baccdb]">{description}</p>
              <h3 className="mt-4 text-[16px] font-medium" style={{ color: accent }}>Why Phenix Labs ?</h3>
              <div className="my-4 h-px bg-[#283750]" />
              <ul className="space-y-[11px]">
                {benefits.map(benefit => <li key={benefit} className="flex gap-3 text-[13px] text-[#baccdb]"><span className="text-[#3c99ff]">✓</span>{benefit}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map(tag => <span key={tag} className="border border-[#283750] bg-[#162236] px-4 py-2 text-[12px]">{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-[100px]">
        <h2 className="text-center text-[34px] font-bold tracking-[-.03em] md:text-[48px]">Our Development Process</h2>
        <div className="relative mx-auto mt-16 grid max-w-[1061px] gap-y-[58px] md:grid-cols-3 md:gap-x-0">
          <div className="absolute left-0 right-0 top-[15px] hidden h-1 bg-[#82c4ff] md:block" />
          <div className="absolute left-0 right-0 top-[198px] hidden h-1 bg-[#82c4ff] md:block" />
          {processSteps.map(([number, shortTitle, title, copy]) => (
            <article key={number} className="relative z-10 min-h-[125px] pr-8">
              <span className="block size-[30px] border-[7px] border-[#ecf1f5] bg-[#3c99ff]" />
              <p className="mt-3 text-[15px] font-bold text-[#0064d7]">{number} / {shortTitle}</p>
              <h3 className="text-[16px] font-bold">{title}</h3>
              <p className="mt-1 max-w-[260px] text-[13px] leading-snug text-[#4e4e4e]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-[100px] pt-5">
        <p className="text-center text-[14px] font-medium text-[#3c99ff]">Technical Care</p>
        <h2 className="mt-1 text-center text-[34px] font-bold tracking-[-.03em] md:text-[48px]">Engineering Services</h2>
        <div className="mx-auto mt-12 grid max-w-[1236px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringServices.map(({ title, icon: Icon, color, copy }) => (
            <article key={title} className="min-h-[190px] rounded-[10px] border border-[#baccdb] bg-white p-6">
              <span className="flex size-10 items-center justify-center rounded-lg" style={{ color, backgroundColor: `${color}20` }}><Icon size={23} /></span>
              <h3 className="mt-5 text-[18px] font-bold">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4e4e4e]">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-[1010px] rounded-[20px] bg-white px-6 py-12 text-center">
          <p className="text-[14px] text-[#3c99ff]">Let&apos;s Build It Together</p>
          <h2 className="mt-3 text-[28px] font-bold md:text-[36px]">Have an idea or engineering<br />challenges ?</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex h-[48px] items-center justify-center bg-[#0064d7] px-8 text-white">Discuss Your Project <span className="ml-4">→</span></Link>
            <Link href="/contact" className="inline-flex h-[48px] items-center justify-center border border-[#3c99ff] px-8 text-[#3c99ff]">Contact Us</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#060d18] px-5 pt-20 text-white">
        <div className="mx-auto max-w-[1236px]">
          <div className="mx-auto max-w-[903px] text-center"><h2 className="text-[34px] font-bold md:text-[48px]">Get In Touch</h2><p className="mt-4 text-sm text-[#aeaeae] md:text-[20px]">Thank you for your interest in Phenix Labs! Please use this form to contact us, we would get back to you as soon as we can.</p></div>
          <div className="mt-12 grid gap-10 md:grid-cols-[.85fr_1.15fr]">
            <div className="space-y-8">
              {contactDetails.map(({ icon: Icon, title, detail }) => <div key={title} className="flex gap-5"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#162236] text-[#3c99ff]"><Icon size={25} /></span><div><h3 className="text-[20px] font-semibold">{title}</h3><p className="mt-2 text-[16px] leading-relaxed text-[#aeaeae]">{detail}</p></div></div>)}
              <div className="flex items-center gap-3 pt-2"><span>Follow Us</span><a href="#" aria-label="Facebook" className="flex size-[42px] items-center justify-center rounded-lg bg-[#1a2537] font-bold">f</a><a href="#" aria-label="Instagram" className="flex size-[42px] items-center justify-center rounded-lg bg-[#1a2537] text-xs font-bold">IG</a></div>
            </div>
            <form className="grid gap-5 rounded-[20px] border border-[#1d2a3d] bg-[#1a2537]/20 p-6 md:grid-cols-2 md:p-10">
              <label>Full Name<input className="mt-3 h-[52px] w-full rounded-[10px] border border-[#222f42] bg-[#1a2537]/30 px-4 outline-none focus:border-[#0064d7]" placeholder="Enter Full Name" /></label>
              <label>Email<input type="email" className="mt-3 h-[52px] w-full rounded-[10px] border border-[#222f42] bg-[#1a2537]/30 px-4 outline-none focus:border-[#0064d7]" placeholder="Enter Email ID" /></label>
              <label className="md:col-span-2">Message<textarea rows={5} className="mt-3 w-full resize-none rounded-[10px] border border-[#222f42] bg-[#1a2537]/30 p-4 outline-none focus:border-[#0064d7]" placeholder="Enter your Message here..." /></label>
              <button className="h-[58px] rounded-[10px] bg-[#0064d7] md:col-span-2">Send Message</button>
            </form>
          </div>
        </div>
        <footer className="mt-20 border-t border-[#172234] bg-[#000206] py-8"><div className="mx-auto flex max-w-[1236px] flex-col items-center justify-between gap-6 text-[14px] text-[#aeaeae] md:flex-row"><nav className="flex flex-wrap justify-center gap-x-8 gap-y-3"><Link href="/">Home</Link><Link href="/about">About Us</Link><Link href="/cases">Case Studies</Link><Link href="/services">Services</Link><Link href="#">Training</Link><Link href="#">Careers</Link><Link href="#">Products</Link></nav><p className="text-white">© 2024 phenixlabs.in. All rights reserved.</p></div></footer>
      </section>
    </div>
  )
}
