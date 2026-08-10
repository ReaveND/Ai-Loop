import { requireAuth } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import ThemesChart from "@/components/charts/ThemesChart"
import Link from "next/link"

export default async function ThemesPage() {
  const user = await requireAuth()

  // Top Themes
  const themes = await prisma.theme.findMany({
    where: { workspaceId: user.workspaceId },
    include: {
      _count: {
        select: { feedbacks: true }
      }
    },
    orderBy: {
      feedbacks: {
        _count: 'desc'
      }
    },
    take: 10
  })

  const themesData = themes.map(t => ({
    name: t.name,
    count: t._count.feedbacks,
    id: t.id
  }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary mb-2">Themes & Trends</h1>
        <p className="text-textSecondary">Discover what customers are talking about most.</p>
      </div>
      
      <div className="bg-surface-1 p-6 rounded-xl border border-borderSubtle shadow-sm">
        <h2 className="text-lg font-semibold text-textPrimary mb-6">Top Themes</h2>
        <div className="max-w-3xl mb-8">
          {themesData.length > 0 ? (
             <ThemesChart data={themesData} />
          ) : (
             <div className="text-textSecondary">No themes detected yet.</div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-2/50 border-b border-borderSubtle">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-textSecondary uppercase tracking-wider">Theme Name</th>
                <th className="px-6 py-3 text-xs font-medium text-textSecondary uppercase tracking-wider">Mentions</th>
                <th className="px-6 py-3 text-xs font-medium text-textSecondary uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderSubtle">
              {themesData.map(item => (
                <tr key={item.id} className="hover:bg-surface-2/50 relative">
                  <td className="px-6 py-4 text-sm font-medium text-textPrimary">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                    {item.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/feedback?theme=${item.name}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                      View Feedback
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
