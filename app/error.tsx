'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AlertTriangle, House, RotateCcw } from 'lucide-react'
import { StatusPage } from '@/components/feedback/StatusPage'

/** App Router error boundary with retry and safe navigation actions. */
interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Preserve the runtime error in browser diagnostics while showing a friendly UI.
    console.error('[Error]', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#eaf0f4]">
      {/* A minimal brand header remains independent from the layout that may have failed. */}
      <header className="flex h-[82px] items-center border-b border-[#cfdae3]/65 px-5 sm:px-7">
        <Link href="/" aria-label="Phenix Labs home" className="inline-flex items-center transition-opacity hover:opacity-80">
          <Image src="/images/logo.png" alt="Phenix Labs" width={64} height={60} className="h-[60px] w-[64px] object-contain" priority />
        </Link>
      </header>
      <StatusPage
        code="500"
        eyebrow="System interruption"
        title="Something interrupted the process."
        description="The page could not finish loading. Retry the operation first; if the issue continues, return home and begin again from a stable route."
        icon={<AlertTriangle aria-hidden="true" size={15} />}
        actions={
          <>
            <button
              type="button"
              onClick={reset}
              className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#0064d7] px-7 font-semibold text-white shadow-[0_14px_34px_rgba(0,100,215,.23)] transition-all hover:-translate-y-0.5 hover:bg-[#0055b8] sm:w-auto"
            >
              <RotateCcw aria-hidden="true" size={18} className="transition-transform group-hover:-rotate-45" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#9fb3c2] bg-white/55 px-7 font-semibold text-[#203348] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#0064d7]/55 hover:text-[#0064d7] sm:w-auto"
            >
              <House aria-hidden="true" size={18} />
              Return home
            </Link>
          </>
        }
      />
    </div>
  )
}
