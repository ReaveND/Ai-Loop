import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  
  const workspace = await prisma.workspace.findUnique({
    where: { id: user?.workspaceId }
  })
  
  const feedbackCount = await prisma.feedback.count({
    where: { workspaceId: user?.workspaceId }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500 mb-1">Workspace</h2>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{workspace?.name}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500 mb-1">Role</h2>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{user?.role}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500 mb-1">Total Feedback</h2>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{feedbackCount}</p>
        </div>
      </div>
    </div>
  )
}
