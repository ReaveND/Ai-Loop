import { requireAuth } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, FileText } from "lucide-react"
import ReportPrintButton from "@/app/(dashboard)/reports/[id]/ReportPrintButton"
import ReactMarkdown from "react-markdown"

export default async function ReportPage({ params }: { params: { id: string } }) {
  const user = await requireAuth()

  const report = await prisma.report.findUnique({
    where: { 
      id: params.id,
      workspaceId: user.workspaceId 
    }
  })

  if (!report) {
    notFound()
  }

  // Type assertion since contentJson is typed as JsonValue in Prisma
  const content = report.contentJson as { markdown?: string }
  const markdownText = content?.markdown || "No content generated."

  return (
    <div className="max-w-4xl mx-auto pb-12 print:max-w-full print:pb-0">
      {/* Hide this top bar when printing */}
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link href="/reports" className="inline-flex items-center text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Reports
        </Link>
        <ReportPrintButton />
      </div>

      <div className="bg-surface-1 border border-borderSubtle rounded-2xl shadow-sm overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Report Header */}
        <div className="p-8 border-b border-borderSubtle bg-surface-2/30 print:bg-transparent print:border-slate-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent-500/20 border border-accent-500/30 flex items-center justify-center text-accent-400 print:text-black print:border-slate-300 print:bg-transparent">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-textPrimary print:text-black">{report.title}</h1>
              <div className="flex items-center mt-1 text-sm text-textTertiary print:text-slate-600">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>Period: {report.periodStart.toLocaleDateString()} - {report.periodEnd.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Report Body - Markdown */}
        <div className="p-8 prose prose-slate dark:prose-invert max-w-none print:prose-slate print:text-black print:p-0 print:pt-6">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
