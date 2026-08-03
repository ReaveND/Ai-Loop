import { MessageSquare, TrendingUp, AlertTriangle } from "lucide-react"

export default function DashboardMetrics({
  totalFeedback,
  newThisWeek,
  volumeSpikePercentage,
  negativePercentage
}: {
  totalFeedback: number
  newThisWeek: number
  volumeSpikePercentage: number
  negativePercentage: number
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg mr-4">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Total Feedback</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalFeedback.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg mr-4">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">New This Week</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{newThisWeek.toLocaleString()}</p>
            {volumeSpikePercentage !== 0 && (
              <span className={`text-xs font-semibold ${volumeSpikePercentage > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {volumeSpikePercentage > 0 ? '↑' : '↓'} {Math.abs(volumeSpikePercentage)}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg mr-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Negative Sentiment</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{negativePercentage}%</p>
        </div>
      </div>
    </div>
  )
}
