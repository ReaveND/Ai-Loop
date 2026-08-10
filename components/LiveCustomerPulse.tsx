"use client"

import React, { useState } from "react"
import {
  Activity,
  Ticket,
  Smartphone,
  Smile,
  Briefcase,
  Tag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/components/ToastProvider"

interface PulseItem {
  id: string
  channel: "Support Tickets" | "App Store Reviews" | "NPS Survey" | "Sales Notes"
  customer: string
  quote: string
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE"
  theme: string
  timeAgo: string
  priority: "HIGH" | "NORMAL"
}

const PULSE_ITEMS: PulseItem[] = [
  {
    id: "TIC-4928",
    channel: "Support Tickets",
    customer: "Acme Corp (Enterprise)",
    quote: "Need an easier way to bulk export our weekly analytics to CSV for executive reporting.",
    sentiment: "NEUTRAL",
    theme: "Feature Request",
    timeAgo: "2m ago",
    priority: "HIGH",
  },
  {
    id: "NPS-8102",
    channel: "NPS Survey",
    customer: "Stripe DevOps Team",
    quote: "The new AI theme categorization saved us 6 hours of manual ticket sorting this week. 10/10!",
    sentiment: "POSITIVE",
    theme: "UX/UI",
    timeAgo: "14m ago",
    priority: "NORMAL",
  },
  {
    id: "REV-3391",
    channel: "App Store Reviews",
    customer: "iOS App Store User v4.2",
    quote: "App crashes intermittently when switching between dark mode and light mode on iPad.",
    sentiment: "NEGATIVE",
    theme: "Bug/Crash",
    timeAgo: "32m ago",
    priority: "HIGH",
  },
  {
    id: "SAL-1104",
    channel: "Sales Notes",
    customer: "Vercel Product Lead",
    quote: "Interested in upgrading to Annual Enterprise tier if SSO SAML integration can be provisioned by Friday.",
    sentiment: "POSITIVE",
    theme: "Pricing",
    timeAgo: "1h ago",
    priority: "HIGH",
  },
]

export default function LiveCustomerPulse() {
  const [filter, setFilter] = useState<"ALL" | "HIGH" | "POSITIVE">("ALL")
  const { toast } = useToast()

  const filteredItems = PULSE_ITEMS.filter((item) => {
    if (filter === "HIGH") return item.priority === "HIGH"
    if (filter === "POSITIVE") return item.sentiment === "POSITIVE"
    return true
  })

  const getChannelBadge = (channel: PulseItem["channel"]) => {
    switch (channel) {
      case "Support Tickets":
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-accent-400 bg-accent-50 border border-accent-500/20 px-2 py-0.5 rounded-md">
            <Ticket className="w-3 h-3 mr-1" />
            Support Ticket
          </span>
        )
      case "App Store Reviews":
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
            <Smartphone className="w-3 h-3 mr-1" />
            App Review
          </span>
        )
      case "NPS Survey":
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-semantic-success bg-semantic-success-bg border border-semantic-success/20 px-2 py-0.5 rounded-md">
            <Smile className="w-3 h-3 mr-1" />
            NPS Survey
          </span>
        )
      case "Sales Notes":
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
            <Briefcase className="w-3 h-3 mr-1" />
            Sales Note
          </span>
        )
    }
  }

  return (
    <div className="bg-surface-1 border border-borderSubtle rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-borderSubtle pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent-50 text-accent-400 flex items-center justify-center">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-textPrimary flex items-center">
              <span>Live Customer Pulse</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-semantic-success-bg text-semantic-success border border-semantic-success/30">
                • LIVE STREAM
              </span>
            </h3>
            <p className="text-xs text-textSecondary">
              Real-time ingress and automatic AI theme tagging across customer touchpoints.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 bg-surface-2 p-1 rounded-xl border border-borderSubtle">
          <button
            type="button"
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === "ALL"
                ? "bg-surface-3 text-textPrimary shadow-sm"
                : "text-textSecondary hover:text-textPrimary"
            }`}
          >
            All Signals
          </button>
          <button
            type="button"
            onClick={() => setFilter("HIGH")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${
              filter === "HIGH"
                ? "bg-semantic-danger-bg text-semantic-danger shadow-sm"
                : "text-textSecondary hover:text-semantic-danger"
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            <span>High Priority</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter("POSITIVE")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${
              filter === "POSITIVE"
                ? "bg-semantic-success-bg text-semantic-success shadow-sm"
                : "text-textSecondary hover:text-semantic-success"
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Positive</span>
          </button>
        </div>
      </div>

      {/* Pulse Items Stream */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              toast({
                title: `${item.id} • ${item.customer}`,
                description: `"${item.quote}" — AI Tagged as ${item.theme} (${item.sentiment})`,
              })
            }}
            className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface-2/60 hover:bg-surface-2 border border-borderSubtle hover:border-accent-500/40 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <div className="flex items-start space-x-3.5 max-w-2xl">
              <div className="mt-0.5 shrink-0">{getChannelBadge(item.channel)}</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-textPrimary">{item.customer}</span>
                  <span className="font-mono text-[11px] text-textTertiary">• {item.id}</span>
                  {item.priority === "HIGH" && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-semantic-danger-bg text-semantic-danger border border-semantic-danger/30">
                      HIGH PRIORITY
                    </span>
                  )}
                </div>
                <p className="text-xs text-textSecondary group-hover:text-textPrimary transition-colors line-clamp-2 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* AI Theme & Time Right Column */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
              <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full bg-surface-3 border border-borderSubtle text-textSecondary group-hover:border-accent-400/30 group-hover:text-textPrimary transition-colors">
                <Tag className="w-3 h-3 mr-1 text-accent-400" />
                {item.theme}
              </span>
              <span className="text-[11px] font-mono text-textTertiary tabular-nums">
                {item.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
