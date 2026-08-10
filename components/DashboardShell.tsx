"use client"

import React, { useState } from "react"
import Sidebar from "@/components/Sidebar"
import TopBar from "@/components/TopBar"
import { ToastProvider } from "@/components/ToastProvider"

interface DashboardShellProps {
  user: {
    name: string | null
    email: string
    role: string
  }
  children: React.ReactNode
}

export default function DashboardShell({ user, children }: DashboardShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <ToastProvider>
      {/* 
        h-screen overflow-hidden ensures ONLY the inner <main> element scrolls,
        leaving the Sidebar and TopBar fixed in place at all times.
      */}
      <div className="h-screen w-screen flex bg-canvas text-textPrimary overflow-hidden">
        <Sidebar
          user={user}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <TopBar
            onOpenMobileSidebar={() => setIsMobileOpen(true)}
            workspaceName="Primary Workspace"
          />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
