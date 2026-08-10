import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"
import { logoutAction } from "@/app/actions"
import { Users, MessageSquare, LayoutDashboard, Settings, LogOut, TrendingUp, Sparkles } from "lucide-react"

import { ToastProvider } from "@/components/ToastProvider"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  return (
    <ToastProvider>
      <div className="min-h-screen flex bg-canvas text-textPrimary">
        <aside className="w-64 border-r border-borderSubtle bg-surface-1 flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-borderSubtle">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LOOP</span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:bg-surface-2 hover:text-textPrimary transition-colors"><LayoutDashboard size={18} /> <span>Dashboard</span></Link>
            <Link href="/feedback" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:bg-surface-2 hover:text-textPrimary transition-colors"><MessageSquare size={18} /> <span>Feedback</span></Link>
            <Link href="/themes" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:bg-surface-2 hover:text-textPrimary transition-colors"><TrendingUp size={18} /> <span>Themes & Trends</span></Link>
            <Link href="/ask" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:bg-surface-2 hover:text-textPrimary transition-colors"><Sparkles size={18} /> <span>Ask LOOP</span></Link>
            <Link href="/members" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:bg-surface-2 hover:text-textPrimary transition-colors"><Users size={18} /> <span>Members</span></Link>
            <Link href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:bg-surface-2 hover:text-textPrimary transition-colors"><Settings size={18} /> <span>Settings</span></Link>
          </nav>
          <div className="p-4 border-t border-borderSubtle">
            <div className="mb-4">
              <p className="text-sm font-medium text-textPrimary truncate">{user.name}</p>
              <p className="text-xs text-textTertiary truncate">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-accent-500/20 border border-accent-500/30 text-accent-400 text-xs rounded-full">{user.role}</span>
            </div>
            <form action={logoutAction}>
              <button className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-semantic-danger hover:bg-semantic-danger-bg transition-colors"><LogOut size={18} /> <span>Sign Out</span></button>
            </form>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
