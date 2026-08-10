"use client"

import { createFeedbackAction } from "@/app/actions"
import { useRef, useState, useTransition } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

export default function FeedbackForm({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void
  onCancel?: () => void
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

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
        toast({
          title: "Feedback saved",
          description: "New customer signal added to live inbox.",
          variant: "success",
        })
        if (onSuccess) onSuccess()
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-semantic-danger-bg border border-semantic-danger/30 text-semantic-danger rounded-lg text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-textSecondary mb-1.5">
          Feedback Content *
        </label>
        <textarea
          name="content"
          required
          rows={3}
          placeholder="Paste or type customer quote..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-textSecondary mb-1.5">Channel *</label>
          <input
            name="channel"
            type="text"
            required
            placeholder="e.g. Email, Twitter, Zendesk"
            className="w-full px-3.5 py-2 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-textSecondary mb-1.5">
            Customer Label
          </label>
          <input
            name="customerLabel"
            type="text"
            placeholder="e.g. VIP, Enterprise"
            className="w-full px-3.5 py-2 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-textSecondary mb-1.5">Source Ref</label>
          <input
            name="sourceRef"
            type="text"
            placeholder="e.g. TICKET-#1234"
            className="w-full px-3.5 py-2 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm transition-all focus:outline-none input-glow"
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-3 border-t border-borderSubtle">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center px-5 py-2 bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-lg text-xs transition-all shadow-sm disabled:opacity-50 focus-ring"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              <span>Analyzing & Saving...</span>
            </>
          ) : (
            <span>Save Feedback</span>
          )}
        </button>
      </div>
    </form>
  )
}
