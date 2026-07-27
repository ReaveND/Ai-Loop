"use client"

import { createFeedbackAction } from "@/app/actions"
import { useRef, useState, useTransition } from "react"

export default function FeedbackForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await createFeedbackAction(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        formRef.current?.reset()
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Feedback Content *</label>
        <textarea name="content" required rows={3} className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Channel *</label>
          <input name="channel" type="text" required placeholder="e.g. Email, Twitter" className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Customer Label</label>
          <input name="customerLabel" type="text" placeholder="e.g. VIP, Enterprise" className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Source Ref</label>
          <input name="sourceRef" type="text" placeholder="e.g. Zendesk #1234" className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
          {isPending ? "Saving..." : "Save Feedback"}
        </button>
      </div>
    </form>
  )
}
