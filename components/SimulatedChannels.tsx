"use client"

import { useState, useTransition } from "react"
import { simulateFeedbackAction } from "@/app/actions/simulate"
import { MessageSquare, DownloadCloud, Loader2, CheckCircle2 } from "lucide-react"

const CHANNELS = [
  "Support Tickets",
  "App Store Reviews",
  "NPS Survey",
  "Sales Notes"
] as const

export default function SimulatedChannels() {
  const [isPending, startTransition] = useTransition()
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [result, setResult] = useState<{ channel: string, count: number } | null>(null)

  const handleSimulate = (channel: typeof CHANNELS[number]) => {
    setActiveChannel(channel)
    setResult(null)
    startTransition(async () => {
      const res = await simulateFeedbackAction(channel)
      if (res.success) {
        setResult({ channel, count: res.count as number })
      } else {
        alert(res.error)
      }
      setActiveChannel(null)
    })
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
        <DownloadCloud className="w-5 h-5 mr-2 text-blue-500" />
        Simulated Channels
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        Generate demo feedback to simulate integrations. Each channel generates 20-30 records.
      </p>
      
      <div className="flex flex-wrap gap-3">
        {CHANNELS.map((channel) => (
          <button
            key={channel}
            onClick={() => handleSimulate(channel)}
            disabled={isPending}
            className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            {isPending && activeChannel === channel ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <MessageSquare className="w-4 h-4 mr-2 text-slate-400" />
            )}
            Import {channel}
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-4 flex items-center text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Successfully imported {result.count} {result.channel}.
        </div>
      )}
    </div>
  )
}
