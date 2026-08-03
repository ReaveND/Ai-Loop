import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"
import { logoutAction } from "@/app/actions"
import { Users, MessageSquare, LayoutDashboard, Settings, LogOut, TrendingUp, Sparkles } from "lucide-react"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LOOP</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"><LayoutDashboard size={18} /> <span>Dashboard</span></Link>
          <Link href="/feedback" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"><MessageSquare size={18} /> <span>Feedback</span></Link>
          <Link href="/themes" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"><TrendingUp size={18} /> <span>Themes & Trends</span></Link>
          <Link href="/ask" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"><Sparkles size={18} /> <span>Ask LOOP</span></Link>
          <Link href="/members" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"><Users size={18} /> <span>Members</span></Link>
          <Link href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"><Settings size={18} /> <span>Settings</span></Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">{user.role}</span>
          </div>
          <form action={logoutAction}>
            <button className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"><LogOut size={18} /> <span>Sign Out</span></button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
