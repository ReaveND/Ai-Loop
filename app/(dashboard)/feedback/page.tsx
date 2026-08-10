import { getPaginatedFeedback, FeedbackFilters } from "@/lib/services/feedback"
import { getCurrentUser } from "@/lib/session"
import FeedbackFiltersComponent from "@/components/FeedbackFilters"
import FeedbackTable from "@/components/FeedbackTable"
import FeedbackActionBar from "@/components/FeedbackActionBar"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()

  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1
  const limit = 20

  const filters: FeedbackFilters = {
    search: typeof searchParams.search === "string" ? searchParams.search : undefined,
    channel: typeof searchParams.channel === "string" ? searchParams.channel : undefined,
    sentiment: typeof searchParams.sentiment === "string" ? searchParams.sentiment : undefined,
    theme: typeof searchParams.theme === "string" ? searchParams.theme : undefined,
    status: typeof searchParams.status === "string" ? searchParams.status : undefined,
    dateRange: typeof searchParams.dateRange === "string" ? searchParams.dateRange : undefined,
  }

  let data: {
    id: string
    content: string
    channel: string
    status: string
    createdAt: Date
    sentiment?: string
    sourceRef?: string
  }[] = []
  let totalPages = 0
  let totalWorkspaceCount = 0
  let error = null

  try {
    const [result, workspaceCount] = await Promise.all([
      getPaginatedFeedback(page, limit, filters),
      user ? prisma.feedback.count({ where: { workspaceId: user.workspaceId } }) : Promise.resolve(0),
    ])
    data = result.data.map(item => ({
      id: item.id,
      content: item.content,
      channel: item.channel,
      status: item.status,
      createdAt: item.createdAt,
      sentiment: (item as unknown as { sentiment?: string }).sentiment,
      sourceRef: (item as unknown as { sourceRef?: string }).sourceRef,
    }))
    totalPages = result.totalPages
    totalWorkspaceCount = workspaceCount
  } catch {
    error = "You do not have permission to view feedback in this workspace."
  }

  const canCreate = user?.role === "ADMIN" || user?.role === "ANALYST"

  const buildPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    params.set("page", newPage.toString())
    return `/feedback?${params.toString()}`
  }

  return (
    <div className="space-y-6">
      {/* Header & Primary Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-borderSubtle pb-5">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary mb-1">Feedback Inbox</h1>
          <p className="text-sm text-textSecondary">
            Centralized customer signals across support, email, and product channels.
          </p>
        </div>

        <FeedbackActionBar canCreate={!!canCreate} />
      </div>

      {error ? (
        <div className="p-4 bg-semantic-danger-bg border border-semantic-danger/30 text-semantic-danger rounded-xl text-sm font-medium">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Filter Bar */}
          <FeedbackFiltersComponent />

          {/* Feedback Table */}
          <FeedbackTable data={data} hasAnyFeedback={totalWorkspaceCount > 0} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-4 flex items-center justify-between border-t border-borderSubtle text-xs text-textSecondary">
              <span>
                Page <strong className="text-textPrimary font-semibold">{page}</strong> of{" "}
                <strong className="text-textPrimary font-semibold">{totalPages}</strong>
              </span>

              <div className="flex items-center space-x-2">
                {page > 1 ? (
                  <Link
                    href={buildPaginationUrl(page - 1)}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-1 border border-borderSubtle text-textPrimary hover:bg-surface-2 transition-colors focus-ring"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    <span>Previous</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-1 border border-borderSubtle/50 text-textTertiary cursor-not-allowed">
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    <span>Previous</span>
                  </span>
                )}

                {page < totalPages ? (
                  <Link
                    href={buildPaginationUrl(page + 1)}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-1 border border-borderSubtle text-textPrimary hover:bg-surface-2 transition-colors focus-ring"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-1 border border-borderSubtle/50 text-textTertiary cursor-not-allowed">
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
