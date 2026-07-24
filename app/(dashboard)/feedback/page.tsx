import { getFeedback } from "@/lib/services/feedback"
import { getCurrentUser } from "@/lib/session"
import FeedbackForm from "./FeedbackForm"

export default async function FeedbackPage() {
  const user = await getCurrentUser()
  let feedbacks: any[] = []
  let error = null
  
  try {
    feedbacks = await getFeedback()
  } catch (err) {
    error = "You do not have permission to view feedback."
  }
  
  const canCreate = user?.role === "ADMIN" || user?.role === "ANALYST"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Feedback</h1>
        <p className="text-slate-500">Manage and view customer feedback for your workspace.</p>
      </div>

      {canCreate && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add New Feedback</h2>
          <FeedbackForm />
        </div>
      )}
      
      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {feedbacks.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white max-w-xs truncate">{item.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">{item.status}</span>
                  </td>
                </tr>
              ))}
              {feedbacks.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-slate-500">No feedback found</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
