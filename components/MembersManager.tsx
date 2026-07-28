"use client"

import { useState, useTransition } from "react"
import { inviteMemberAction, updateMemberRoleAction, deleteMemberAction } from "@/app/actions/members"
import { UserPlus, Shield, Trash2, Loader2, CheckCircle2, AlertCircle, Mail, User, Lock } from "lucide-react"

type Member = {
  id: string
  name: string | null
  email: string
  role: string
}

export default function MembersManager({ members, currentUserId }: { members: Member[]; currentUserId?: string }) {
  const [isPending, startTransition] = useTransition()
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("ANALYST")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("role", role)

    startTransition(async () => {
      const res = await inviteMemberAction(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess("Teammate invited successfully!")
        setName("")
        setEmail("")
        setPassword("")
        setRole("ANALYST")
        setShowInviteModal(false)
        setTimeout(() => setSuccess(null), 4000)
      }
    })
  }

  const handleRoleChange = (memberId: string, newRole: string) => {
    setError(null)
    setSuccess(null)
    startTransition(async () => {
      const res = await updateMemberRoleAction(memberId, newRole)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess("Role updated successfully.")
        setTimeout(() => setSuccess(null), 3000)
      }
    })
  }

  const handleDelete = (memberId: string, memberEmail: string) => {
    if (!confirm(`Are you sure you want to remove ${memberEmail} from the workspace?`)) return
    setError(null)
    setSuccess(null)
    startTransition(async () => {
      const res = await deleteMemberAction(memberId)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess("Member removed.")
        setTimeout(() => setSuccess(null), 3000)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Workspace Team</h2>
          <p className="text-sm text-slate-500">
            Invite teammates and assign roles (ADMIN, ANALYST, VIEWER) to control workspace permissions.
          </p>
        </div>
        <button
          onClick={() => {
            setShowInviteModal(!showInviteModal)
            setError(null)
          }}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Teammate
        </button>
      </div>

      {error && (
        <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800 text-sm">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800 text-sm">
          <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {showInviteModal && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Invite New Teammate</h3>
              <p className="text-xs text-slate-500 mt-0.5">Create a login account for your teammate and assign a role.</p>
            </div>
          </div>

          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Initial Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Assigned Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-4 w-4 text-slate-400" />
                  </div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ANALYST">ANALYST — Ingest & manage feedback</option>
                    <option value="VIEWER">VIEWER — Read-only access</option>
                    <option value="ADMIN">ADMIN — Full workspace & team control</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Create Teammate Account
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member Name</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role Permissions</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-semibold text-xs mr-3">
                        {(member.name || member.email)[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{member.name || "Unnamed"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={member.role}
                      disabled={isPending}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full border outline-none cursor-pointer transition-colors
                        ${member.role === "ADMIN" ? "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" : ""}
                        ${member.role === "ANALYST" ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" : ""}
                        ${member.role === "VIEWER" ? "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700" : ""}
                      `}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="ANALYST">ANALYST</option>
                      <option value="VIEWER">VIEWER</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {member.id !== currentUserId && (
                      <button
                        onClick={() => handleDelete(member.id, member.email)}
                        disabled={isPending}
                        title="Remove member"
                        className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No members found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
