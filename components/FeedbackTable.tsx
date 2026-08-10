"use client"

import { useTransition, useState } from "react"
import { updateFeedbackStatusAction } from "@/app/actions/feedback"
import {
  Loader2,
  MoreVertical,
  MessageSquare,
  Ticket,
  Smartphone,
  Smile,
  Briefcase,
  Copy,
  CheckCircle2,
  ExternalLink,
} from "lucide-react"
import { useToast } from "@/components/ToastProvider"
import EmptyState from "@/components/EmptyState"

type Feedback = {
  id: string
  content: string
  channel: string
  status: string
  createdAt: Date
  sentiment?: string
  sourceRef?: string
}

export default function FeedbackTable({
  data,
  hasAnyFeedback = true,
}: {
  data: Feedback[]
  hasAnyFeedback?: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateFeedbackStatusAction(id, newStatus)
      if (res.error) {
        toast({ title: "Update failed", description: res.error, variant: "danger" })
      } else {
        toast({
          title: "Status updated",
          description: `Feedback moved to ${newStatus}.`,
          variant: "success",
        })
      }
      setActiveMenuId(null)
    })
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Support Tickets":
        return <Ticket className="w-4 h-4 text-accent-400" />
      case "App Store Reviews":
        return <Smartphone className="w-4 h-4 text-indigo-400" />
      case "NPS Survey":
        return <Smile className="w-4 h-4 text-semantic-success" />
      case "Sales Notes":
        return <Briefcase className="w-4 h-4 text-semantic-warning" />
      default:
        return <MessageSquare className="w-4 h-4 text-textSecondary" />
    }
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - new Date(date).getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: "Copied to clipboard", description: "Feedback quote copied.", variant: "default" })
    setActiveMenuId(null)
  }

  if (data.length === 0) {
    if (!hasAnyFeedback) {
      return (
        <EmptyState
          title="No feedback in workspace yet"
          description="Your inbox is empty. Import from CSV or simulate live customer channels to begin."
        />
      )
    }
    return (
      <EmptyState
        title="No results match your filters"
        description="Try clearing your search query or adjusting your channel, sentiment, or theme filters."
      />
    )
  }

  return (
    <div className="bg-surface-1 border border-borderSubtle rounded-xl overflow-hidden shadow-sm relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-2 border-b border-borderSubtle text-textSecondary text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 font-semibold">Feedback Content</th>
              <th className="px-5 py-3 font-semibold">Channel</th>
              <th className="px-5 py-3 font-semibold">Source Ref</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Received</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderSubtle text-sm">
            {data.map(item => (
              <tr
                key={item.id}
                className="hover:bg-surface-2 transition-colors group h-14"
              >
                {/* Content column */}
                <td className="px-5 py-3 max-w-md">
                  <p
                    className="text-textPrimary font-medium truncate leading-snug"
                    title={item.content}
                  >
                    {item.content}
                  </p>
                </td>

                {/* Channel column */}
                <td className="px-5 py-3 whitespace-nowrap">
                  <div className="flex items-center space-x-2 text-textSecondary">
                    {getChannelIcon(item.channel)}
                    <span className="text-xs font-medium">{item.channel}</span>
                  </div>
                </td>

                {/* Source Ref column */}
                <td className="px-5 py-3 whitespace-nowrap">
                  <span className="font-mono text-xs text-textTertiary bg-surface-2 px-2 py-1 rounded border border-borderSubtle">
                    {item.sourceRef || `REF-${item.id.slice(0, 6).toUpperCase()}`}
                  </span>
                </td>

                {/* Status column */}
                <td className="px-5 py-3 whitespace-nowrap">
                  <select
                    value={item.status}
                    disabled={isPending}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full border outline-none cursor-pointer transition-colors ${
                      item.status === "NEW"
                        ? "bg-accent-50 text-accent-400 border-accent-500/30"
                        : item.status === "REVIEWED"
                        ? "bg-semantic-warning-bg text-semantic-warning border-semantic-warning/30"
                        : "bg-semantic-success-bg text-semantic-success border-semantic-success/30"
                    }`}
                  >
                    <option value="NEW">NEW</option>
                    <option value="REVIEWED">REVIEWED</option>
                    <option value="ACTIONED">ACTIONED</option>
                  </select>
                </td>

                {/* Received column */}
                <td className="px-5 py-3 whitespace-nowrap text-xs text-textSecondary tabular-nums">
                  {getRelativeTime(item.createdAt)}
                </td>

                {/* Kebab menu actions */}
                <td className="px-4 py-3 whitespace-nowrap text-right relative">
                  <button
                    type="button"
                    onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                    aria-label="Row actions"
                    className="p-1.5 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-surface-3 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeMenuId === item.id && (
                    <div className="absolute right-6 top-10 w-44 bg-surface-2 border border-borderStrong rounded-xl shadow-2xl p-1 z-30 space-y-0.5 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(item.content)}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary hover:bg-surface-3 rounded-lg transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Quote</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, "ACTIONED")}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-semantic-success hover:bg-semantic-success-bg rounded-lg transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark as Actioned</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          toast({
                            title: `Feedback #${item.id.slice(0, 6)}`,
                            description: item.content,
                          })
                          setActiveMenuId(null)
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary hover:bg-surface-3 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPending && (
        <div className="absolute inset-0 bg-canvas/60 backdrop-blur-sm flex items-center justify-center z-20">
          <Loader2 className="w-7 h-7 animate-spin text-accent-400" />
        </div>
      )}
    </div>
  )
}
