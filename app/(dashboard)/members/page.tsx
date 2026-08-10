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
    <div className="space-y-6">
      {error ? (
        <div className="p-4 bg-semantic-danger-bg border border-semantic-danger/30 text-semantic-danger rounded-xl text-sm font-medium">
          {error}
        </div>
      ) : (
        <MembersManager members={members} currentUserId={user?.id} />
      )}
    </div>
  )
}
