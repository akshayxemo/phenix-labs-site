import {
  AlarmClock,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { SEO_CONFIG } from '@/config/seo'

const contactDetails = [
  {
    icon: Phone,
    label: 'Call us',
    value: '+91 89615 48205',
    href: 'tel:+918961548205',
  },
  {
    icon: Mail,
    label: 'Email us',
    value: 'gyankrishna@phenixlabs.in',
    href: 'mailto:gyankrishna@phenixlabs.in',
  },
  {
    icon: AlarmClock,
    label: 'Working hours',
    value: 'Mon–Fri · 08:00–17:00',
  },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: SEO_CONFIG.social.instagram,
    mark: 'IG',
  },
  {
    label: 'LinkedIn',
    href: SEO_CONFIG.social.linkedin,
    mark: 'in',
  },
  {
    label: 'Facebook',
    href: SEO_CONFIG.social.facebook,
    mark: 'f',
  },
  {
    label: 'Twitter',
    href: `https://twitter.com/${SEO_CONFIG.social.twitter.replace('@', '')}`,
    mark: 'X',
  },
]

const panelClassName =
  'h-full rounded-[20px] border border-white/[0.085] bg-linear-to-b from-white/[0.052] to-white/[0.018] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_28px_80px_rgba(0,0,0,0.18)]'

export function ContactFooterSection() {
  return (
    <section
      id="get-in-touch"
      className="relative overflow-hidden px-5 py-20 text-white md:py-28"
      aria-labelledby="contact-footer-title"
    >
      <div
        aria-hidden="true"
        className="absolute -left-44 top-20 size-[460px] rounded-full bg-[#0064d7]/16 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-44 bottom-0 size-[420px] rounded-full bg-[#a984ff]/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1236px]">
        <div className="max-w-[900px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#77b8ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <span className="size-2 rounded-full bg-[#4ddb9d] shadow-[0_0_0_5px_rgba(77,219,157,0.1)]" />
            Available for new projects
          </span>
          <h2
            id="contact-footer-title"
            className="mt-7 text-[42px] font-bold leading-[1.02] tracking-[-0.045em] md:text-[64px]"
          >
            Let&apos;s build something worth remembering.
          </h2>
          <p className="mt-6 max-w-[680px] text-[17px] leading-8 text-[#98a6b7]">
            Tell us what you are exploring, improving, or bringing to life. We
            will respond with clear next steps—not a generic sales pitch.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-2">
          <div className={`${panelClassName} flex flex-col p-6 sm:p-9 md:p-10`}>
            <div className="border-b border-white/[0.075] pb-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#58a7ff]">
                Direct lines
              </p>
              <h3 className="mt-3 text-[28px] font-bold tracking-[-0.025em] md:text-[34px]">
                Talk with our team
              </h3>
              <p className="mt-3 max-w-[470px] text-sm leading-6 text-[#8998aa]">
                Reach us directly or use the project form. We usually respond
                within one business day.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {contactDetails.map(({ icon: Icon, label, value, href }, index) => {
                const content = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[#12243a] text-[#67aeff] shadow-[inset_0_1px_0_rgba(255,255,255,0.055)]">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#6f8094]">
                        {label}
                      </span>
                      <span className="mt-1 block truncate text-sm font-semibold text-[#d5dee8]">
                        {value}
                      </span>
                    </span>
                    {href && (
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-auto shrink-0 text-[#5d7086] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#67aeff]"
                        size={16}
                      />
                    )}
                  </>
                )
                const className = `group flex min-h-[82px] items-center gap-3 rounded-[16px] border border-white/[0.07] bg-[#081422]/70 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-colors hover:border-[#58a7ff]/30 hover:bg-[#0a1828] ${
                  index === 2 ? 'sm:col-span-2' : ''
                }`

                return href ? (
                  <a key={label} href={href} className={className}>
                    {content}
                  </a>
                ) : (
                  <div key={label} className={className}>
                    {content}
                  </div>
                )
              })}
            </div>

            <div className="mt-3 flex gap-3 rounded-[16px] border border-white/[0.07] bg-[#081422]/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[#12243a] text-[#67aeff] shadow-[inset_0_1px_0_rgba(255,255,255,0.055)]">
                <MapPin aria-hidden="true" size={20} />
              </span>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#6f8094]">
                  Visit us
                </span>
                <address className="mt-1 text-sm font-medium not-italic leading-6 text-[#d5dee8]">
                  TC 6/215/NLRA 135, Neerazhi Line, Ulloor,
                  Thiruvananthapuram 695011
                </address>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#718196]">
                Follow our work
              </p>
              <div className="flex gap-2">
                {socialLinks.map(({ label, href, mark }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow Phenix Labs on ${label}`}
                    className="flex size-10 items-center justify-center rounded-[13px] border border-white/[0.075] bg-white/[0.035] text-[#94a4b6] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#58a7ff]/35 hover:bg-[#10243b] hover:text-[#67aeff]"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[12px] font-extrabold tracking-[-0.04em]"
                    >
                      {mark}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={`${panelClassName} p-6 sm:p-9 md:p-10`}>
            <div className="mb-8 border-b border-white/[0.075] pb-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#58a7ff]">
                Start a conversation
              </p>
              <h3 className="mt-3 text-[28px] font-bold tracking-[-0.025em] md:text-[34px]">
                What can we help you create?
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#8998aa]">
                Share a few details. Required fields are marked with an asterisk.
              </p>
            </div>
            <ContactForm
              idPrefix="footer-contact"
              variant="footer"
              showSubscribe={false}
              submitButtonText="Send project enquiry"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
