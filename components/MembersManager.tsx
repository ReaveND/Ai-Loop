"use client"

import { useState, useTransition } from "react"
import { inviteMemberAction, updateMemberRoleAction, deleteMemberAction } from "@/app/actions/members"
import {
  UserPlus,
  Shield,
  Trash2,
  Loader2,
  AlertCircle,
  Mail,
  User,
  Lock,
  Copy,
  Link as LinkIcon,
  HelpCircle,
} from "lucide-react"
import { useToast } from "@/components/ToastProvider"

type Member = {
  id: string
  name: string | null
  email: string
  role: string
}

export default function MembersManager({
  members,
  currentUserId,
}: {
  members: Member[]
  currentUserId?: string
}) {
  const [isPending, startTransition] = useTransition()
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("ANALYST")
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const defaultInviteUrl = "https://app.loop.ai/invite/loop-team-default"

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("role", role)

    startTransition(async () => {
      const res = await inviteMemberAction(formData)
      if (res.error) {
        setError(res.error)
        toast({ title: "Invite failed", description: res.error, variant: "danger" })
      } else {
        toast({
          title: "Teammate Invited",
          description: `Account created for ${email} with role ${role}.`,
          variant: "success",
        })
        setName("")
        setEmail("")
        setPassword("")
        setRole("ANALYST")
        setShowInviteModal(false)
      }
    })
  }

  const handleRoleChange = (memberId: string, newRole: string) => {
    setError(null)
    startTransition(async () => {
      const res = await updateMemberRoleAction(memberId, newRole)
      if (res.error) {
        toast({ title: "Role update failed", description: res.error, variant: "danger" })
      } else {
        toast({
          title: "Role updated",
          description: `Teammate permissions set to ${newRole}.`,
          variant: "success",
        })
      }
    })
  }

  const handleDelete = (memberId: string, memberEmail: string) => {
    if (!confirm(`Are you sure you want to remove ${memberEmail} from the workspace?`)) return
    setError(null)
    startTransition(async () => {
      const res = await deleteMemberAction(memberId)
      if (res.error) {
        toast({ title: "Remove failed", description: res.error, variant: "danger" })
      } else {
        toast({
          title: "Member removed",
          description: `${memberEmail} has been removed from the workspace.`,
          variant: "default",
        })
      }
    })
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(defaultInviteUrl)
    toast({
      title: "Invite Link Copied",
      description: "Share this link with your teammate to join directly.",
      variant: "success",
    })
  }

  return (
    <div className="space-y-8">
      {/* Top Header & Invite Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-borderSubtle pb-5">
        <div>
          <h2 className="text-2xl font-bold text-textPrimary mb-1">Workspace Team & Roles</h2>
          <p className="text-sm text-textSecondary">
            Manage your team members and assign role-based access permissions (RBAC).
          </p>
        </div>
        <button
          onClick={() => {
            setShowInviteModal(!showInviteModal)
            setError(null)
          }}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-accent-500 hover:bg-accent-400 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm focus-ring"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          <span>Invite Teammate</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center p-3.5 bg-semantic-danger-bg text-semantic-danger rounded-xl border border-semantic-danger/30 text-xs">
          <AlertCircle className="w-4 h-4 mr-2.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Invite Modal Card */}
      {showInviteModal && (
        <div className="bg-surface-1 p-6 rounded-2xl border border-borderStrong shadow-xl space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-borderSubtle pb-4">
            <div>
              <h3 className="text-base font-semibold text-textPrimary">Invite New Teammate</h3>
              <p className="text-xs text-textSecondary mt-0.5">
                Create a login account for your teammate and assign a role.
              </p>
            </div>
          </div>

          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-textSecondary mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-textTertiary" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="block w-full pl-9 pr-3 py-2 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-textSecondary mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-textTertiary" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="block w-full pl-9 pr-3 py-2 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-textSecondary mb-1.5">
                  Initial Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-textTertiary" />
                  </div>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="block w-full pl-9 pr-3 py-2 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-textSecondary mb-1.5">
                  Assigned Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-4 w-4 text-textTertiary" />
                  </div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
                  >
                    <option value="ANALYST">ANALYST — Ingest & manage feedback</option>
                    <option value="VIEWER">VIEWER — Read-only access</option>
                    <option value="ADMIN">ADMIN — Full workspace & team control</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Copy Invite Link Bar */}
            <div className="p-3 rounded-lg bg-surface-2 border border-borderSubtle flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 overflow-hidden">
                <LinkIcon className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <span className="text-xs font-mono text-textSecondary truncate">
                  {defaultInviteUrl}
                </span>
              </div>
              <button
                type="button"
                onClick={copyInviteLink}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-surface-1 hover:bg-surface-3 border border-borderSubtle text-xs font-medium text-textPrimary transition-colors flex-shrink-0 focus-ring"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-borderSubtle">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center px-4 py-2 bg-accent-500 hover:bg-accent-400 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 focus-ring"
              >
                {isPending ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : null}
                <span>Create Teammate Account</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Member List Table */}
      <div className="bg-surface-1 border border-borderSubtle rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-2 border-b border-borderSubtle text-textSecondary text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Member Name</th>
                <th className="px-6 py-3.5 font-semibold">Email Address</th>
                <th className="px-6 py-3.5 font-semibold">Role Permissions</th>
                <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderSubtle text-sm">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-surface-2 transition-colors h-16">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-accent-50 text-accent-400 flex items-center justify-center font-bold text-xs mr-3 shadow-inner">
                        {(member.name || member.email)[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-textPrimary">
                        {member.name || "Unnamed"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-textSecondary font-mono">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={member.role}
                      disabled={isPending}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border outline-none cursor-pointer transition-colors ${
                        member.role === "ADMIN"
                          ? "bg-accent-500/10 text-accent-400 border-accent-500/30"
                          : member.role === "ANALYST"
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                          : "bg-surface-2 text-textSecondary border-borderSubtle"
                      }`}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="ANALYST">ANALYST</option>
                      <option value="VIEWER">VIEWER</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {member.id !== currentUserId && (
                      <button
                        type="button"
                        onClick={() => handleDelete(member.id, member.email)}
                        disabled={isPending}
                        title="Remove member"
                        className="text-textTertiary hover:text-semantic-danger p-1.5 rounded-lg hover:bg-surface-3 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-xs text-textSecondary">
                    No workspace members found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Capabilities Comparison Card */}
      <div className="bg-surface-1 border border-borderSubtle rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <HelpCircle className="w-4 h-4 text-accent-400" />
          <h3 className="text-sm font-semibold text-textPrimary">
            Role Permission Capabilities
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-borderSubtle text-textSecondary">
                <th className="py-2.5 pr-4 font-semibold">Capability</th>
                <th className="py-2.5 px-4 font-semibold text-accent-400">ADMIN</th>
                <th className="py-2.5 px-4 font-semibold text-indigo-400">ANALYST</th>
                <th className="py-2.5 pl-4 font-semibold text-textSecondary">VIEWER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderSubtle">
              <tr>
                <td className="py-2.5 pr-4 text-textPrimary">View dashboard charts & inbox</td>
                <td className="py-2.5 px-4 text-semantic-success font-medium">Yes</td>
                <td className="py-2.5 px-4 text-semantic-success font-medium">Yes</td>
                <td className="py-2.5 pl-4 text-semantic-success font-medium">Yes</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-textPrimary">Add manual feedback & upload CSV</td>
                <td className="py-2.5 px-4 text-semantic-success font-medium">Yes</td>
                <td className="py-2.5 px-4 text-semantic-success font-medium">Yes</td>
                <td className="py-2.5 pl-4 text-textTertiary">No</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-textPrimary">Update feedback status (NEW → ACTIONED)</td>
                <td className="py-2.5 px-4 text-semantic-success font-medium">Yes</td>
                <td className="py-2.5 px-4 text-semantic-success font-medium">Yes</td>
                <td className="py-2.5 pl-4 text-textTertiary">No</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-textPrimary">Invite & remove workspace teammates</td>
                <td className="py-2.5 px-4 text-semantic-success font-medium">Yes</td>
                <td className="py-2.5 px-4 text-textTertiary">No</td>
                <td className="py-2.5 pl-4 text-textTertiary">No</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-textPrimary">Change member RBAC roles</td>
                <td className="py-2.5 px-4 text-semantic-success font-medium">Yes</td>
                <td className="py-2.5 px-4 text-textTertiary">No</td>
                <td className="py-2.5 pl-4 text-textTertiary">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
