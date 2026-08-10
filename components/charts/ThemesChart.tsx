"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

interface ThemeItem {
  name: string
  count: number
  sentiment?: "POSITIVE" | "NEUTRAL" | "NEGATIVE"
}

export default function ThemesChart({ data }: { data: ThemeItem[] }) {
  const router = useRouter()

  const getSentimentDot = (name: string, index: number) => {
    // Assign a deterministic mini sentiment indicator for visual context
    const sentiments = ["POSITIVE", "NEGATIVE", "NEUTRAL", "POSITIVE", "NEGATIVE"]
    const sentiment = sentiments[index % sentiments.length]
    if (sentiment === "POSITIVE") return <span className="w-2 h-2 rounded-full bg-semantic-success" />
    if (sentiment === "NEGATIVE") return <span className="w-2 h-2 rounded-full bg-semantic-danger" />
    return <span className="w-2 h-2 rounded-full bg-neutral-500" />
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center text-sm text-textSecondary">
        No themes detected yet.
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full flex flex-col justify-between">
      <div>
        <p className="text-xs text-textSecondary mb-3">
          Click any theme tag to filter customer feedback in your inbox.
        </p>

        <div className="flex flex-wrap gap-2.5 overflow-y-auto max-h-[220px] pr-1">
          {data.map((item, idx) => (
            <button
              key={item.name}
              type="button"
              onClick={() => router.push(`/feedback?theme=${encodeURIComponent(item.name)}`)}
              className="group inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-borderSubtle hover:border-borderStrong transition-all text-left focus-ring"
            >
              {getSentimentDot(item.name, idx)}
              <span className="text-xs font-mono font-medium text-textPrimary group-hover:text-accent-400 transition-colors">
                #{item.name}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-surface-1 text-[11px] font-semibold text-textSecondary tabular-nums border border-borderSubtle">
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-borderSubtle flex items-center justify-between">
        <span className="text-xs text-textTertiary">{data.length} themes tracked</span>
        <button
          type="button"
          onClick={() => router.push("/feedback")}
          className="inline-flex items-center text-xs font-medium text-accent-400 hover:text-accent-500 transition-colors group"
        >
          <span>View all in Feedback Inbox</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
