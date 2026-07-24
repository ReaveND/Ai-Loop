"use client"

import { signupAction, loginAction } from "@/app/actions"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await signupAction(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        // Automatically log them in
        try {
          await loginAction(formData)
        } catch (err) {}
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Create Workspace</h1>
            <p className="text-slate-500 dark:text-slate-400">Get started with LOOP in seconds.</p>
          </div>
          
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company / Workspace Name</label>
              <input name="workspaceName" type="text" required minLength={2} className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
              <input name="userName" type="text" required minLength={2} className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input name="email" type="email" required className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input name="password" type="password" required minLength={6} className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
              {isPending ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 text-center border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
