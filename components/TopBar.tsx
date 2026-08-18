"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { Bell, Menu, ChevronRight, Layers } from "lucide-react"

interface TopBarProps {
  onOpenMobileSidebar: () => void
  workspaceName?: string
}

export default function TopBar({ onOpenMobileSidebar, workspaceName = "Primary Workspace" }: TopBarProps) {
  const pathname = usePathname()

  const getPageTitle = (path: string) => {
    if (path.startsWith("/dashboard")) return "Dashboard"
    if (path.startsWith("/feedback")) return "Feedback Inbox"
    if (path.startsWith("/themes")) return "Themes & Trends"
    if (path.startsWith("/ask")) return "Ask LOOP"
    if (path.startsWith("/reports")) return "Reports"
    if (path.startsWith("/members")) return "Workspace Members"
    if (path.startsWith("/settings")) return "Settings"
    return "Workspace"
  }

  const title = getPageTitle(pathname)

  return (
    <header className="h-16 shrink-0 border-b border-borderSubtle bg-surface-1/90 backdrop-blur-md px-6 flex items-center justify-between z-30">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar menu"
          className="lg:hidden p-1.5 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-surface-2 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs font-medium text-textSecondary">
          <span className="flex items-center space-x-1.5 text-textTertiary">
            <Layers className="w-3.5 h-3.5 text-accent-400" />
            <span>{workspaceName}</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-borderStrong" />
          <span className="text-textPrimary font-semibold text-sm">{title}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center px-2.5 py-1 rounded-full bg-surface-2 border border-borderSubtle text-xs text-textSecondary">
          <span className="w-2 h-2 rounded-full bg-semantic-success mr-2"></span>
          All channels synced
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-surface-2 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-500"></span>
        </button>
      </div>
    </header>
  )
}
