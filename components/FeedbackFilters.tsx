"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"

export default function FeedbackFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [channel, setChannel] = useState(searchParams.get("channel") || "all")
  const [sentiment, setSentiment] = useState(searchParams.get("sentiment") || "all")
  const [theme, setTheme] = useState(searchParams.get("theme") || "all")
  const [status, setStatus] = useState(searchParams.get("status") || "all")
  const [dateRange, setDateRange] = useState(searchParams.get("dateRange") || "all")

  // Debounced search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      updateFilters({ search })
    }, 300)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const updateFilters = (newValues: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")

    Object.entries(newValues).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`/feedback?${params.toString()}`)
  }

  const activeCount = [
    search,
    channel !== "all" ? channel : "",
    sentiment !== "all" ? sentiment : "",
    theme !== "all" ? theme : "",
    status !== "all" ? status : "",
    dateRange !== "all" ? dateRange : "",
  ].filter(Boolean).length

  const handleClearAll = () => {
    setSearch("")
    setChannel("all")
    setSentiment("all")
    setTheme("all")
    setStatus("all")
    setDateRange("all")
    router.push("/feedback")
  }

  return (
    <div className="bg-surface-1 p-3.5 rounded-xl border border-borderSubtle shadow-sm mb-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borderSubtle pb-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-accent-400" />
          <span className="text-xs font-semibold text-textPrimary">Filter Inbox</span>
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-accent-50 text-accent-400 text-[11px] font-bold">
              {activeCount} active
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center space-x-1 text-xs font-medium text-textSecondary hover:text-textPrimary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex-1 min-w-[220px] relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-textTertiary" />
          </div>
          <input
            type="text"
            placeholder="Search quote, ticket ID, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-9 pr-3 py-1.5 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
          />
        </div>

        <select
          value={channel}
          onChange={(e) => {
            setChannel(e.target.value)
            updateFilters({ channel: e.target.value })
          }}
          className="px-3 py-1.5 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
        >
          <option value="all">All Channels</option>
          <option value="Support Tickets">Support Tickets</option>
          <option value="App Store Reviews">App Store Reviews</option>
          <option value="NPS Survey">NPS Survey</option>
          <option value="Sales Notes">Sales Notes</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            updateFilters({ status: e.target.value })
          }}
          className="px-3 py-1.5 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
        >
          <option value="all">All Statuses</option>
          <option value="NEW">New</option>
          <option value="REVIEWED">Reviewed</option>
          <option value="ACTIONED">Actioned</option>
        </select>

        <select
          value={sentiment}
          onChange={(e) => {
            setSentiment(e.target.value)
            updateFilters({ sentiment: e.target.value })
          }}
          className="px-3 py-1.5 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
        >
          <option value="all">All Sentiments</option>
          <option value="POSITIVE">Positive</option>
          <option value="NEUTRAL">Neutral</option>
          <option value="NEGATIVE">Negative</option>
        </select>

        <select
          value={theme}
          onChange={(e) => {
            setTheme(e.target.value)
            updateFilters({ theme: e.target.value })
          }}
          className="px-3 py-1.5 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
        >
          <option value="all">All Themes</option>
          <option value="Pricing">Pricing</option>
          <option value="Bug/Crash">Bug/Crash</option>
          <option value="Feature Request">Feature Request</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Customer Support">Customer Support</option>
        </select>

        <select
          value={dateRange}
          onChange={(e) => {
            setDateRange(e.target.value)
            updateFilters({ dateRange: e.target.value })
          }}
          className="px-3 py-1.5 border border-borderSubtle rounded-lg bg-surface-2 text-textPrimary text-xs focus:outline-none input-glow"
        >
          <option value="all">All Time</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>
    </div>
  )
}
