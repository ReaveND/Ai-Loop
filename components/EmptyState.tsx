"use client"

import React from "react"
import Link from "next/link"
import { LucideIcon, Inbox } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionText?: string
  onAction?: () => void
  actionHref?: string
  secondaryActionText?: string
  onSecondaryAction?: () => void
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  onAction,
  actionHref,
  secondaryActionText,
  onSecondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-xl bg-surface-1 border border-borderSubtle my-4">
      <div className="w-12 h-12 rounded-xl bg-surface-2 border border-borderStrong flex items-center justify-center text-accent-400 mb-4 shadow-inner">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-semibold text-textPrimary mb-1">{title}</h3>
      <p className="text-sm text-textSecondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center space-x-3">
        {actionText && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center px-4 py-2 bg-accent-500 hover:bg-accent-400 text-white text-sm font-medium rounded-lg transition-colors shadow-sm focus-ring"
          >
            {actionText}
          </Link>
        )}
        {actionText && onAction && !actionHref && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center px-4 py-2 bg-accent-500 hover:bg-accent-400 text-white text-sm font-medium rounded-lg transition-colors shadow-sm focus-ring"
          >
            {actionText}
          </button>
        )}
        {secondaryActionText && onSecondaryAction && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="inline-flex items-center justify-center px-4 py-2 bg-surface-2 hover:bg-surface-3 border border-borderSubtle text-textPrimary text-sm font-medium rounded-lg transition-colors focus-ring"
          >
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  )
}
