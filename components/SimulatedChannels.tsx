"use client"

import { useState, useTransition } from "react"
import { simulateFeedbackAction } from "@/app/actions/simulate"
import { MessageSquare, DownloadCloud, Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

const CHANNELS = [
  "Support Tickets",
  "App Store Reviews",
  "NPS Survey",
  "Sales Notes",
] as const

export default function SimulatedChannels({ onSimulateComplete }: { onSimulateComplete?: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [result, setResult] = useState<{ channel: string; count: number } | null>(null)
  const { toast } = useToast()

  const handleSimulate = (channel: typeof CHANNELS[number]) => {
    setActiveChannel(channel)
    setResult(null)
    startTransition(async () => {
      const res = await simulateFeedbackAction(channel)
      if (res.success) {
        setResult({ channel, count: res.count as number })
        toast({
          title: `${channel} Simulated`,
          description: `Generated ${res.count} synthetic feedback records.`,
          variant: "success",
        })
        if (onSimulateComplete) onSimulateComplete()
      } else {
        toast({
          title: "Simulation failed",
          description: res.error || "An error occurred.",
          variant: "danger",
        })
      }
      setActiveChannel(null)
    })
  }

  return (
    <div className="bg-surface-1 p-5 rounded-xl border border-borderSubtle shadow-sm">
      <h3 className="text-sm font-semibold text-textPrimary mb-2 flex items-center">
        <DownloadCloud className="w-4 h-4 mr-2 text-accent-400" />
        Simulated Channels
      </h3>
      <p className="text-xs text-textSecondary mb-4">
        Generate demo customer feedback to test AI sentiment and theme detection.
      </p>

      <div className="flex flex-wrap gap-2.5">
        {CHANNELS.map((channel) => (
          <button
            key={channel}
            onClick={() => handleSimulate(channel)}
            disabled={isPending}
            className="inline-flex items-center px-3.5 py-2 border border-borderSubtle bg-surface-2 text-textSecondary hover:text-textPrimary hover:bg-surface-3 rounded-lg disabled:opacity-50 transition-colors text-xs font-medium focus-ring"
          >
            {isPending && activeChannel === channel ? (
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin text-accent-400" />
            ) : (
              <MessageSquare className="w-3.5 h-3.5 mr-2 text-textTertiary" />
            )}
            <span>Import {channel}</span>
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-3 flex items-center text-xs text-semantic-success bg-semantic-success-bg border border-semantic-success/30 p-2.5 rounded-lg">
          <CheckCircle2 className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
          <span>
            Successfully imported <strong className="font-mono">{result.count}</strong> records from {result.channel}.
          </span>
        </div>
      )}
    </div>
  )
}
