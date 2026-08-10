"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  User,
  Shield,
  X,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react"
import { logoutAction } from "@/app/actions"

interface SidebarProps {
  user: {
    name: string | null
    email: string
    role: string
  }
  isMobileOpen: boolean
  onCloseMobile: () => void
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/members", label: "Members", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function Sidebar({ user, isMobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)

  const initials = (user.name || user.email)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      {/* Mobile Backdrop Scrim */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-canvas/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 h-screen bg-surface-1 border-r border-borderSubtle flex flex-col justify-between transition-all duration-300 select-none ${
          isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* TOP REGION: Logo & Workspace Switcher */}
        <div className="flex flex-col border-b border-borderSubtle">
          {/* Brand Header */}
          <div className="h-16 px-4 flex items-center justify-between">
            <Link
              href="/dashboard"
              onClick={onCloseMobile}
              className="flex items-center space-x-3 overflow-hidden group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-accent-400 flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-md shadow-accent-500/20 group-hover:scale-105 transition-transform">
                LP
              </div>
              {!isCollapsed && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-extrabold tracking-tight text-textPrimary">
                    LOOP
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-500/15 text-accent-400 border border-accent-500/30">
                    AI PRO
                  </span>
                </div>
              )}
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close sidebar"
              className="lg:hidden p-1.5 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-surface-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop collapse button */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:flex p-1.5 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-surface-2 transition-colors"
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Workspace Selector Badge Card */}
          {!isCollapsed && (
            <div className="px-3 pb-3">
              <div className="p-2.5 rounded-xl bg-surface-2/60 border border-borderSubtle hover:border-borderStrong transition-all cursor-pointer flex items-center justify-between group">
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <div className="w-2 h-2 rounded-full bg-semantic-success shrink-0 animate-pulse" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-textPrimary truncate">
                      Primary Workspace
                    </p>
                    <p className="text-[10px] font-medium text-textSecondary truncate">
                      14,280 feedback signals
                    </p>
                  </div>
                </div>
                <ChevronsUpDown className="w-4 h-4 text-textTertiary group-hover:text-textSecondary shrink-0" />
              </div>
            </div>
          )}
        </div>

        {/* MIDDLE REGION: Navigation Links & AI Status Card */}
        <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {/* Navigation Items */}
          <div className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold tracking-wider uppercase text-textTertiary">
                Core Intelligence
              </p>
            )}
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              const IconComponent = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`group flex items-center py-2.5 px-3 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? "bg-accent-500/15 text-textPrimary border border-accent-500/30 shadow-sm"
                      : "text-textSecondary hover:text-textPrimary hover:bg-surface-2/60 border border-transparent"
                  } ${isCollapsed ? "justify-center px-0" : "space-x-3"}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-accent-500 shadow-sm shadow-accent-500/50" />
                  )}
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive
                        ? "text-accent-400"
                        : "text-textSecondary group-hover:text-textPrimary"
                    }`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>

          {/* Mini AI System Status Card (Visible when expanded) */}
          {!isCollapsed && (
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-surface-2 to-surface-1 border border-borderSubtle space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-textPrimary">
                  <Sparkles className="w-3.5 h-3.5 text-accent-400" />
                  <span>AI Engine Live</span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-semantic-success">
                  99.9%
                </span>
              </div>
              <p className="text-[11px] text-textSecondary leading-normal">
                Real-time sentiment NLP scoring across all active channels.
              </p>
              <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-accent-500 h-full rounded-full transition-all duration-500"
                  style={{ width: "84%" }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-textTertiary">
                <span>Ingress capacity</span>
                <span>84% utilized</span>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM REGION: User Profile & Account Menu */}
        <div className="p-3 border-t border-borderSubtle relative">
          {/* Account Dropdown Menu */}
          {showAccountMenu && (
            <div
              className={`absolute bottom-20 left-3 right-3 bg-surface-2 border border-borderStrong rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150 ${
                isCollapsed ? "w-56 left-16" : ""
              }`}
            >
              <div className="px-3 py-2 border-b border-borderSubtle">
                <p className="text-xs font-bold text-textPrimary truncate">
                  {user.name || "LOOP Teammate"}
                </p>
                <p className="text-[11px] text-textSecondary truncate mt-0.5 font-mono">
                  {user.email}
                </p>
                <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-accent-500/20 text-accent-400 border border-accent-500/30 uppercase">
                  {user.role}
                </div>
              </div>

              <Link
                href="/settings"
                onClick={() => {
                  setShowAccountMenu(false)
                  onCloseMobile()
                }}
                className="flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary hover:bg-surface-3 rounded-xl transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-accent-400" />
                <span>Workspace Settings</span>
              </Link>

              <Link
                href="/settings"
                onClick={() => {
                  setShowAccountMenu(false)
                  onCloseMobile()
                }}
                className="flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary hover:bg-surface-3 rounded-xl transition-colors"
              >
                <User className="w-3.5 h-3.5 text-semantic-success" />
                <span>Profile &amp; Security</span>
              </Link>

              <form action={logoutAction} className="border-t border-borderSubtle pt-1 mt-1">
                <button
                  type="submit"
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-semantic-danger hover:bg-semantic-danger-bg rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </form>
            </div>
          )}

          {/* Profile Clickable Button */}
          <button
            type="button"
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className={`w-full flex items-center p-2 rounded-xl bg-surface-2/40 hover:bg-surface-2 border border-borderSubtle hover:border-borderStrong transition-all text-left cursor-pointer ${
              isCollapsed ? "justify-center px-0" : "space-x-3"
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
              {initials || "LP"}
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-textPrimary truncate">
                  {user.name || "Teammate"}
                </p>
                <p className="text-[10px] text-textSecondary truncate font-mono">
                  {user.email}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <div className="w-2 h-2 rounded-full bg-semantic-success shrink-0" />
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
