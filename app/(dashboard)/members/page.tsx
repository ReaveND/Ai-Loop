import { getMembers } from "@/lib/services/members"
import { getCurrentUser } from "@/lib/session"
import MembersManager from "@/components/MembersManager"

export default async function MembersPage() {
  const user = await getCurrentUser()
  let members: { id: string; name: string | null; email: string; role: string }[] = []
  let error: string | null = null
  
  try {
    members = await getMembers()
  } catch {
    error = "You do not have permission to view or manage workspace members."
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Workspace Members & Roles</h1>
        <p className="text-slate-500">Manage your team members and configure role-based access permissions.</p>
      </div>
      
      {error ? (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
          {error}
        </div>
      ) : (
        <MembersManager members={members} currentUserId={user?.id} />
      )}
    </div>
  )
}
