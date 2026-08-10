import { requireAuth } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { FileText, Calendar } from "lucide-react"
import ReportGenerateButton from "@/app/(dashboard)/reports/ReportGenerateButton"

export default async function ReportsPage() {
  const user = await requireAuth()

  const reports = await prisma.report.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary mb-2">Voice of Customer Reports</h1>
          <p className="text-textSecondary">Generate and view automated weekly and monthly summaries.</p>
        </div>
        <ReportGenerateButton />
      </div>

      <div className="bg-surface-1 border border-borderSubtle rounded-xl overflow-hidden shadow-sm">
        {reports.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-textTertiary mb-4" />
            <h3 className="text-lg font-semibold text-textPrimary mb-2">No reports generated yet</h3>
            <p className="text-textSecondary text-sm max-w-md mb-6">
              Generate an AI-powered Voice of Customer report to summarize feedback trends, sentiment, and themes for your team.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-borderSubtle">
            {reports.map(report => (
              <Link 
                key={report.id} 
                href={`/reports/${report.id}`}
                className="flex items-center justify-between p-4 hover:bg-surface-2 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-2 border border-borderSubtle flex items-center justify-center text-textSecondary group-hover:text-accent-400 group-hover:border-accent-500/30 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-textPrimary">{report.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-textTertiary space-x-3">
                      <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {report.periodStart.toLocaleDateString()} - {report.periodEnd.toLocaleDateString()}</span>
                      <span>Generated: {report.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-accent-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Report &rarr;
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
