import { getPaginatedFeedback, FeedbackFilters } from "@/lib/services/feedback"
import { getCurrentUser } from "@/lib/session"
import FeedbackForm from "./FeedbackForm"
import CsvUploader from "@/components/CsvUploader"
import SimulatedChannels from "@/components/SimulatedChannels"
import FeedbackFiltersComponent from "@/components/FeedbackFilters"
import FeedbackTable from "@/components/FeedbackTable"
import Link from "next/link"

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()
  
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const limit = 20

  const filters: FeedbackFilters = {
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
    channel: typeof searchParams.channel === 'string' ? searchParams.channel : undefined,
    sentiment: typeof searchParams.sentiment === 'string' ? searchParams.sentiment : undefined,
    theme: typeof searchParams.theme === 'string' ? searchParams.theme : undefined,
    status: typeof searchParams.status === 'string' ? searchParams.status : undefined,
    dateRange: typeof searchParams.dateRange === 'string' ? searchParams.dateRange : undefined,
  }

  let data: { id: string; content: string; channel: string; status: string; createdAt: Date }[] = []
  let totalPages = 0
  let error = null
  
  try {
    const result = await getPaginatedFeedback(page, limit, filters)
    data = result.data
    totalPages = result.totalPages
  } catch {
    error = "You do not have permission to view feedback."
  }
  
  const canCreate = user?.role === "ADMIN" || user?.role === "ANALYST"

  const buildPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    params.set('page', newPage.toString())
    return `/feedback?${params.toString()}`
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Feedback Inbox</h1>
        <p className="text-slate-500">Manage and analyze customer feedback for your workspace.</p>
      </div>

      {canCreate && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add Manual Feedback</h2>
            <FeedbackForm />
          </div>
          <div className="space-y-6">
            <CsvUploader />
            <SimulatedChannels />
          </div>
        </div>
      )}
      
      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      ) : (
        <div>
          <FeedbackFiltersComponent />
          
          <FeedbackTable data={data} />

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              {page > 1 && (
                <Link
                  href={buildPaginationUrl(page - 1)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Previous
                </Link>
              )}
              <span className="px-4 py-2 text-slate-500">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={buildPaginationUrl(page + 1)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
