"use client"

import { MessageSquare, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardMetrics({
  totalFeedback,
  newThisWeek,
  negativePercentage,
}: {
  totalFeedback: number
  newThisWeek: number
  negativePercentage: number
}) {
  const router = useRouter()
  const hasData = totalFeedback > 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Card 1: Total Feedback */}
      <div
        onClick={() => router.push("/feedback")}
        className="relative overflow-hidden p-6 rounded-2xl bg-surface-1 border border-borderSubtle hover:border-accent-500/50 hover:bg-surface-2 transition-all duration-200 cursor-pointer shadow-sm group flex items-center space-x-5"
      >
        <div className="w-14 h-14 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold text-textSecondary tracking-wide">
            Total Feedback
          </span>
          <p className="text-3xl font-bold text-textPrimary tabular-nums tracking-tight mt-1">
            {totalFeedback.toLocaleString()}
          </p>
          {hasData && (
            <div className="flex items-center mt-1 text-xs font-medium text-semantic-success">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              <span>+12% vs last week</span>
            </div>
          )}
        </div>
      </div>

      {/* Card 2: New This Week */}
      <div
        onClick={() => router.push("/feedback?dateRange=7d")}
        className="relative overflow-hidden p-6 rounded-2xl bg-surface-1 border border-borderSubtle hover:border-semantic-success/50 hover:bg-surface-2 transition-all duration-200 cursor-pointer shadow-sm group flex items-center space-x-5"
      >
        <div className="w-14 h-14 rounded-xl bg-semantic-success-bg border border-semantic-success/20 text-semantic-success flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold text-textSecondary tracking-wide">
            New This Week
          </span>
          <p className="text-3xl font-bold text-textPrimary tabular-nums tracking-tight mt-1">
            {newThisWeek.toLocaleString()}
          </p>
          {hasData && (
            <div className="flex items-center mt-1 text-xs font-medium text-semantic-success">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              <span>+8.4% velocity</span>
            </div>
          )}
        </div>
      </div>

      {/* Card 3: Negative Sentiment */}
      <div
        onClick={() => router.push("/feedback?sentiment=negative")}
        className="relative overflow-hidden p-6 rounded-2xl bg-surface-1 border border-borderSubtle hover:border-semantic-danger/50 hover:bg-surface-2 transition-all duration-200 cursor-pointer shadow-sm group flex items-center space-x-5"
      >
        <div className="w-14 h-14 rounded-xl bg-semantic-danger-bg border border-semantic-danger/20 text-semantic-danger flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold text-textSecondary tracking-wide">
            Negative Sentiment
          </span>
          <p className="text-3xl font-bold text-textPrimary tabular-nums tracking-tight mt-1">
            {negativePercentage}%
          </p>
          {hasData && (
            <div className="flex items-center mt-1 text-xs font-medium text-semantic-success">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              <span>-3.2% churn risk</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
