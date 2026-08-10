import { getDashboardMetrics } from "@/lib/services/dashboard"
import DashboardMetrics from "@/components/DashboardMetrics"
import AiExecutiveBanner from "@/components/AiExecutiveBanner"
import LiveCustomerPulse from "@/components/LiveCustomerPulse"
import VolumeChart from "@/components/charts/VolumeChart"
import SentimentChart from "@/components/charts/SentimentChart"
import ThemesChart from "@/components/charts/ThemesChart"
import Link from "next/link"
import { Calendar, Plus } from "lucide-react"

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary mb-2">Dashboard</h1>
        <p className="text-textSecondary">Overview of your customer feedback and insights.</p>
      </div>
      
      <DashboardMetrics 
        totalFeedback={metrics.totalFeedback}
        newThisWeek={metrics.newThisWeek}
        volumeSpikePercentage={metrics.volumeSpikePercentage}
        negativePercentage={metrics.negativePercentage}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-1 p-6 rounded-xl border border-borderSubtle shadow-sm">
          <h2 className="text-lg font-semibold text-textPrimary mb-6">Feedback Volume (Last 30 Days)</h2>
          <VolumeChart data={metrics.volumeData} />
        </div>

        <div className="flex items-center space-x-3">
          {/* Date-range selector */}
          <div className="relative inline-flex items-center">
            <Calendar className="w-4 h-4 text-textSecondary absolute left-3 pointer-events-none" />
            <select
              defaultValue="30d"
              className="pl-9 pr-8 py-2 rounded-xl bg-surface-2 border border-borderSubtle text-xs font-semibold text-textPrimary hover:bg-surface-3 transition-colors focus-ring cursor-pointer appearance-none shadow-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-textTertiary pointer-events-none text-xs">
              ▾
            </span>
          </div>

          <Link
            href="/feedback"
            className="inline-flex items-center justify-center px-4 py-2 bg-accent-500 hover:bg-accent-400 text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-md shadow-accent-500/20 hover:shadow-accent-500/35 focus-ring"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>Add Feedback</span>
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {/* AI Executive Command Center Banner */}
        <AiExecutiveBanner
          totalFeedback={metrics.totalFeedback}
          newCount={metrics.newThisWeek}
        />

        {/* KPI Stat Cards (3 Cards matching 1st image screenshot layout) */}
        <DashboardMetrics
          totalFeedback={metrics.totalFeedback}
          newThisWeek={metrics.newThisWeek}
          volumeSpikePercentage={metrics.volumeSpikePercentage}
          negativePercentage={metrics.negativePercentage}
        />

        {/* Grid Row 1: Feedback Volume (Last 30 Days) & Sentiment Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VolumeChart data={metrics.volumeData} />
          </div>
          <div className="lg:col-span-1">
            <SentimentChart data={metrics.sentimentData} />
          </div>
        </div>

        {/* Grid Row 2: Emerging AI Themes & Live Customer Pulse Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ThemesChart data={metrics.themesData} />
          <LiveCustomerPulse />
        </div>
      </div>
    </div>
  )
}
