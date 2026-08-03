import type { ReactNode } from 'react'

interface StatusPageProps {
  code: string
  eyebrow: string
  title: string
  description: string
  icon: ReactNode
  actions: ReactNode
}

/** Shared visual foundation for exceptional states such as 404 and runtime errors. */
export function StatusPage({
  code,
  eyebrow,
  title,
  description,
  icon,
  actions,
}: StatusPageProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-82px)] items-center overflow-hidden bg-[#eaf0f4] px-5 py-16 text-[#08111f] md:py-24">
      {/* Technical grid and restrained glows connect this state to the public site visual language. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(22,34,54,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(22,34,54,.12)_1px,transparent_1px)] [background-size:68px_38px] [mask-image:radial-gradient(ellipse_90%_82%_at_50%_45%,black,transparent)]"
      />
      <div aria-hidden="true" className="absolute -left-40 top-[12%] size-[460px] rounded-full bg-[#58a7ff]/13 blur-[110px]" />
      <div aria-hidden="true" className="absolute -right-44 bottom-[8%] size-[420px] rounded-full bg-[#64d4ef]/12 blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        {/* Large status marker is decorative; the meaningful message remains in the text column. */}
        <div aria-hidden="true" className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center">
          <div className="absolute inset-[4%] rounded-full border border-dashed border-[#5a83a4]/28" />
          <div className="absolute inset-[17%] rounded-full border border-[#5a83a4]/18" />
          <div className="absolute inset-[30%] rounded-full bg-[#dce8f0] shadow-[0_0_80px_rgba(44,133,207,.14)]" />
          <span className="relative text-[82px] font-bold leading-none tracking-[-0.075em] text-[#0c70df] sm:text-[104px]">
            {code}
          </span>
          <span className="absolute left-[7%] top-[42%] size-2.5 rounded-full bg-[#58a7ff] shadow-[0_0_16px_#58a7ff]" />
          <span className="absolute bottom-[13%] right-[21%] size-1.5 rounded-full bg-[#39a8d2] shadow-[0_0_12px_#39a8d2]" />
        </div>

        <div className="max-w-[650px] text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#adc3d3] bg-white/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0064d7] shadow-[0_8px_26px_rgba(22,34,54,0.05)] backdrop-blur-md">
            {icon}
            {eyebrow}
          </span>
          <h1 className="mt-6 text-[42px] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[54px] md:text-[64px]">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-[590px] text-[16px] leading-8 text-[#526476] md:text-[18px] lg:mx-0">
            {description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            {actions}
          </div>
        </div>
      </div>
    </section>
  )
}
