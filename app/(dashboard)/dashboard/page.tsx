import { getDashboardMetrics } from "@/lib/services/dashboard"
import DashboardMetrics from "@/components/DashboardMetrics"
import VolumeChart from "@/components/charts/VolumeChart"
import SentimentChart from "@/components/charts/SentimentChart"
import ThemesChart from "@/components/charts/ThemesChart"

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-slate-500">Overview of your customer feedback and insights.</p>
      </div>
      
      <DashboardMetrics 
        totalFeedback={metrics.totalFeedback}
        newThisWeek={metrics.newThisWeek}
        volumeSpikePercentage={metrics.volumeSpikePercentage}
        negativePercentage={metrics.negativePercentage}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Feedback Volume (Last 30 Days)</h2>
          <VolumeChart data={metrics.volumeData} />
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Sentiment Breakdown</h2>
          <SentimentChart data={metrics.sentimentData} />
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Top Themes</h2>
          <div className="max-w-3xl">
            <ThemesChart data={metrics.themesData} />
          </div>
        </div>
      </div>
    </div>
  )
}
