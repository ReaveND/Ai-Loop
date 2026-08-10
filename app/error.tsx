"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled Application Error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-textPrimary px-4">
      <div className="w-20 h-20 bg-semantic-danger-bg border border-semantic-danger/30 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-semantic-danger" />
      </div>
      <h1 className="text-4xl font-bold mb-4 tracking-tight">Something went wrong</h1>
      <p className="text-textSecondary text-center max-w-md mb-8 text-lg">
        We&apos;ve encountered an unexpected error. Our engineering team has been notified.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 bg-surface-2 hover:bg-surface-3 text-textPrimary font-semibold rounded-xl transition-all border border-borderSubtle focus-ring"
        >
          <RefreshCcw className="w-5 h-5 mr-2 text-textSecondary" />
          Try Again
        </button>
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg focus-ring"
        >
          Return to Dashboard
        </Link>
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 p-4 bg-surface-1 border border-borderStrong rounded-lg max-w-2xl w-full overflow-auto">
          <p className="font-mono text-sm text-semantic-danger whitespace-pre-wrap">{error.message}</p>
          <p className="font-mono text-xs text-textTertiary mt-2 whitespace-pre-wrap">{error.stack}</p>
        </div>
      )}
    </div>
  )
}
