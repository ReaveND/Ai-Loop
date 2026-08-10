"use client"

import React, { useState } from "react"
import { Sparkles, Zap, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/components/ToastProvider"
import { useRouter } from "next/navigation"

export default function AiExecutiveBanner({
  totalFeedback = 1284,
  newCount = 42,
}: {
  totalFeedback?: number
  newCount?: number
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleGenerateReport = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)
      toast({
        title: "✨ AI Executive Brief Ready",
        description: "Synthesized 1,284 customer signals across Support, Store Reviews, and Sales notes.",
        variant: "success",
      })
    }, 1200)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-500/15 via-indigo-500/10 to-purple-600/15 p-6 border border-accent-500/30 shadow-[0_0_40px_rgba(59,91,255,0.12)] backdrop-blur-md">
      {/* Decorative ambient glowing circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-50 text-accent-400 border border-accent-500/30 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5" />
            <span>LOOP AI • LIVE SYNTHESIS ENGINE</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-textPrimary leading-snug">
            Customer sentiment has increased{" "}
            <span className="text-semantic-success font-extrabold bg-semantic-success-bg/80 px-2 py-0.5 rounded-lg border border-semantic-success/30">
              +4.2%
            </span>{" "}
            this week across <span className="text-accent-400 font-semibold">10+ integrated channels</span>.
          </h2>

          <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
            High velocity feedback clusters detected in{" "}
            <span className="text-textPrimary font-semibold underline decoration-accent-400/60 decoration-2">
              Pricing Plans
            </span>{" "}
            and{" "}
            <span className="text-textPrimary font-semibold underline decoration-purple-400/60 decoration-2">
              Mobile Navigation UX
            </span>
            . Currently monitoring <strong className="text-textPrimary font-mono">{totalFeedback.toLocaleString('en-US')}</strong> records.
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-white text-xs font-semibold shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 transition-all duration-200 disabled:opacity-60 focus-ring"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Synthesizing Insights...</span>
              </>
            ) : reportGenerated ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2 text-semantic-success" />
                <span>Brief Generated • Re-run</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Generate AI Executive Brief</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              router.push("/feedback?status=NEW")
              toast({
                title: "Filtered to NEW",
                description: `Showing ${newCount} unreviewed customer feedback items.`,
              })
            }}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-borderStrong text-textPrimary text-xs font-semibold transition-all duration-200 hover:border-accent-400/40 focus-ring"
          >
            <Zap className="w-4 h-4 mr-2 text-amber-400" />
            <span>Triage {newCount} NEW Items</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-textTertiary" />
          </button>
        </div>
      </div>
    </div>
  )
}
