'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Error]', error)
  }, [error])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-6xl font-bold text-destructive mb-4">Error</h1>
            <h2 className="text-3xl font-bold leading-snug mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-8">
              We encountered an unexpected error. Please try again or contact support if the problem persists.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:border-primary transition-colors font-medium"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
