import { getMembers } from "@/lib/services/members"

export default async function MembersPage() {
  let members: { id: string; name: string | null; email: string; role: string }[] = []
  let error: string | null = null
  
  try {
    members = await getMembers()
  } catch {
    error = "You do not have permission to view members."
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Workspace Members</h1>
      
      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">{error}</div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{member.name || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{member.role}</span>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                 <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-slate-500">No members found</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
