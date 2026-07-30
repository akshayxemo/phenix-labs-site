import { AlarmClock, MapPin, Phone } from 'lucide-react'

const contactDetails = [
  {
    icon: Phone,
    title: 'Contact',
    detail: (
      <>
        Mobile: +91 8961548205
        <br />
        Mail: gyankrishna@phenixlabs.in
      </>
    ),
  },
  {
    icon: AlarmClock,
    title: 'Working Hours',
    detail: (
      <>
        Monday - Friday 08:00 - 17:00
        <br />
        Saturday & Sunday 08:00 - 12:00
      </>
    ),
  },
  {
    icon: MapPin,
    title: 'Address',
    detail: (
      <>
        TC 6/215/NLRA 135, Neerazhi Line, Ulloor,
        <br />
        Thiruvananthapuram 695011
      </>
    ),
  },
]

export function ContactFooterSection() {
  return (
    <section className="bg-[#060d18] px-5 py-20 text-white" aria-labelledby="contact-footer-title">
      <div className="mx-auto max-w-[1236px]">
        <div className="mx-auto max-w-[903px] text-center">
          <h2 id="contact-footer-title" className="text-[34px] font-bold md:text-[48px]">
            Get In Touch
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#aeaeae] md:text-[20px]">
            Thank you for your interest in Phenix Labs! Please use this form to contact us,
            and we will get back to you as soon as we can.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[.85fr_1.15fr] md:items-start">
          <div className="space-y-8">
            {contactDetails.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex gap-5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#162236] text-[#3c99ff]">
                  <Icon size={25} />
                </span>
                <div>
                  <h3 className="text-[20px] font-semibold">{title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[#aeaeae]">{detail}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 pt-2 text-[16px]">
              <span>Follow Us</span>
              <a
                href="#"
                aria-label="Facebook"
                className="flex size-[42px] items-center justify-center rounded-lg bg-[#1a2537] font-bold"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex size-[42px] items-center justify-center rounded-lg bg-[#1a2537] text-xs font-bold"
              >
                IG
              </a>
            </div>
          </div>

          <form className="grid gap-5 rounded-[20px] border border-[#1d2a3d] bg-[#1a2537]/20 p-6 md:grid-cols-2 md:p-10">
            <label className="text-[16px]">
              Full Name
              <input
                name="name"
                className="mt-3 h-[52px] w-full rounded-[10px] border border-[#222f42] bg-[#1a2537]/30 px-4 text-white outline-none focus:border-[#0064d7]"
                placeholder="Enter Full Name"
              />
            </label>
            <label className="text-[16px]">
              Email
              <input
                type="email"
                name="email"
                className="mt-3 h-[52px] w-full rounded-[10px] border border-[#222f42] bg-[#1a2537]/30 px-4 text-white outline-none focus:border-[#0064d7]"
                placeholder="Enter Email ID"
              />
            </label>
            <label className="text-[16px] md:col-span-2">
              Message
              <textarea
                name="message"
                rows={5}
                className="mt-3 w-full resize-none rounded-[10px] border border-[#222f42] bg-[#1a2537]/30 p-4 text-white outline-none focus:border-[#0064d7]"
                placeholder="Enter your Message here..."
              />
            </label>
            <button
              type="submit"
              className="h-[58px] rounded-[10px] bg-[#0064d7] text-[18px] md:col-span-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
