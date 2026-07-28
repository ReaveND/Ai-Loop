"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

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
    
    // Default resets page to 1 on filter change
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

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <select
          value={channel}
          onChange={(e) => {
            setChannel(e.target.value)
            updateFilters({ channel: e.target.value })
          }}
          className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
