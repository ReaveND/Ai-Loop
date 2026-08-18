"use client"

import { loginAction, logoutAction } from "@/app/actions"
import Link from "next/link"
import { useState, useTransition, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react"

// Inner component that uses useSearchParams – must be wrapped in <Suspense>
function LoginInner() {
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams?.get("clear") === "1") {
      // If we got redirected here to clear a stale session, automatically log out
      logoutAction().catch(() => {})
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        const res = await loginAction(formData)
        if (res?.error) setError(res.error)
      } catch {
        // successful login redirects and throws error in next/navigation
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas p-4 selection:bg-accent-500 selection:text-white relative overflow-hidden">
      {/* Ambient Glowing Radial Wash & Fine Dot Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--border-strong) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Top-left Back to Home Button */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-surface-1/80 hover:bg-surface-2 border border-borderSubtle hover:border-accent-500/50 text-xs font-medium text-textSecondary hover:text-textPrimary transition-all duration-200 shadow-lg shadow-black/20 backdrop-blur-md group focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-textTertiary group-hover:text-accent-400 transition-all duration-200 group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-surface-1 rounded-2xl shadow-2xl border border-borderSubtle border-t-2 border-t-accent-500 overflow-hidden">
          <div className="p-8">
          {/* Brand Logo & Heading */}
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white font-bold text-base tracking-tighter shadow-md mb-3">
              LP
            </div>
            <h1 className="text-2xl font-bold text-textPrimary mb-1">Sign in to LOOP</h1>
            <p className="text-sm text-textSecondary">
              Welcome back. Enter your credentials to access your workspace.
            </p>
          </div>

          {/* Secondary SSO Option */}
          <button
            type="button"
            onClick={() => setError("SSO is available on Enterprise plans. Please sign in with email.")}
            className="w-full flex items-center justify-center space-x-3 px-4 py-2.5 bg-surface-2 hover:bg-surface-3 border border-borderSubtle rounded-lg text-sm font-medium text-textPrimary transition-colors mb-6 focus-ring"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-borderSubtle" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-1 px-3 text-textTertiary font-medium">
                or continue with email
              </span>
            </div>
          </div>

          {/* Inline Error Message */}
          {error && (
            <div className="mb-5 p-3.5 bg-semantic-danger-bg border border-semantic-danger/30 text-semantic-danger rounded-lg text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow ${
                  error ? "border-semantic-danger" : "border-borderSubtle"
                }`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-textSecondary">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault()
                    setError("Password reset link sent to your email (Demo).")
                  }}
                  className="text-xs text-accent-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className={`w-full pl-3.5 pr-10 py-2.5 rounded-lg border bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow ${
                    error ? "border-semantic-danger" : "border-borderSubtle"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textTertiary hover:text-textSecondary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-accent-500 hover:bg-accent-400 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md shadow-accent-500/20 disabled:opacity-50 flex items-center justify-center text-sm focus-ring"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        <div className="bg-surface-2 p-4 text-center border-t border-borderSubtle">
          <p className="text-xs text-textSecondary">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-accent-400 hover:underline font-medium">
              Create workspace
            </Link>
          </p>
        </div>
      </div>

      {/* Subtle Bottom Return to Home Link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs text-textTertiary hover:text-textSecondary transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to home page</span>
        </Link>
      </div>
    </div>
  </div>
)
}

// Default page export – wraps LoginInner in Suspense to satisfy Next.js 14's
// requirement for components that call useSearchParams() during static generation.
export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  )
}
