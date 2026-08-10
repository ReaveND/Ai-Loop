"use client"

import { signupAction, loginAction } from "@/app/actions"
import Link from "next/link"
import { useState, useTransition } from "react"
import { Loader2, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(true)
  const [isPending, startTransition] = useTransition()

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { score: 0, label: "", color: "bg-borderSubtle" }
    if (pass.length < 6) return { score: 1, label: "Too weak", color: "bg-semantic-danger" }
    if (pass.length < 9) return { score: 2, label: "Medium", color: "bg-semantic-warning" }
    return { score: 3, label: "Strong", color: "bg-semantic-success" }
  }

  const strength = getPasswordStrength(password)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service to continue.")
      return
    }

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const res = await signupAction(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        try {
          await loginAction(formData)
        } catch {
          // successful login redirects
        }
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
          <div className="text-center mb-6 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white font-bold text-base tracking-tighter shadow-md mb-3">
              LP
            </div>
            <h1 className="text-2xl font-bold text-textPrimary mb-1">Create your Workspace</h1>
            <p className="text-sm text-textSecondary">
              Get started with LOOP in seconds. No credit card required.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-semantic-danger-bg border border-semantic-danger/30 text-semantic-danger rounded-lg text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">
                Workspace / Company Name
              </label>
              <input
                name="workspaceName"
                type="text"
                required
                minLength={2}
                placeholder="Acme Corp"
                className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">
                Your Full Name
              </label>
              <input
                name="userName"
                type="text"
                required
                minLength={2}
                placeholder="Alex Mercer"
                className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">
                Work Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="alex@acme.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow"
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

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className="flex-1 grid grid-cols-3 gap-1 h-1">
                    <div
                      className={`rounded-full transition-colors ${
                        strength.score >= 1 ? strength.color : "bg-borderSubtle"
                      }`}
                    />
                    <div
                      className={`rounded-full transition-colors ${
                        strength.score >= 2 ? strength.color : "bg-borderSubtle"
                      }`}
                    />
                    <div
                      className={`rounded-full transition-colors ${
                        strength.score >= 3 ? strength.color : "bg-borderSubtle"
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-textSecondary">{strength.label}</span>
                </div>
              )}
            </div>

            {/* Terms of Service Checkbox */}
            <div className="flex items-start space-x-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-borderSubtle bg-surface-2 text-accent-500 focus:ring-accent-400"
              />
              <label htmlFor="terms" className="text-xs text-textSecondary leading-normal">
                I agree to the{" "}
                <a href="#terms" className="text-accent-400 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="text-accent-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-accent-500 hover:bg-accent-400 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md shadow-accent-500/20 disabled:opacity-50 flex items-center justify-center text-sm focus-ring"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Creating Workspace...</span>
                </>
              ) : (
                <span>Create Workspace & Start</span>
              )}
            </button>
          </form>
        </div>

        <div className="bg-surface-2 p-4 text-center border-t border-borderSubtle">
          <p className="text-xs text-textSecondary">
            Already have a workspace?{" "}
            <Link href="/login" className="text-accent-400 hover:underline font-medium">
              Sign in
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
