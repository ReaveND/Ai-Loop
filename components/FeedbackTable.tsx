"use client"

import { useTransition } from "react"
import { updateFeedbackStatusAction, reclassifyFeedbackAction } from "@/app/actions/feedback"
import { Loader2 } from "lucide-react"

type Feedback = {
  id: string
  content: string
  channel: string
  status: string
  createdAt: Date
}

export default function FeedbackTable({ data }: { data: Feedback[] }) {
  const [isPending, startTransition] = useTransition()

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateFeedbackStatusAction(id, newStatus)
      if (res.error) {
        alert(res.error)
      }
    })
  }

  const handleReclassify = (id: string) => {
    startTransition(async () => {
      const res = await reclassifyFeedbackAction(id)
      if (res.error) {
        alert(res.error)
      }
    })
  }

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm p-8 text-center text-slate-500">
        No feedback found matching the criteria.
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Channel</th>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {data.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 relative">
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white max-w-sm truncate" title={item.content}>
                  {item.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.channel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={item.status}
                    disabled={isPending}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full border bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 outline-none
                      ${item.status === 'NEW' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                      ${item.status === 'REVIEWED' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                      ${item.status === 'ACTIONED' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                    `}
                  >
                    <option value="NEW">NEW</option>
                    <option value="REVIEWED">REVIEWED</option>
                    <option value="ACTIONED">ACTIONED</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleReclassify(item.id)}
                    disabled={isPending}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                  >
                    Re-classify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPending && (
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center z-10">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      )}
    </div>
  )
}
