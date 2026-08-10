"use client"

import React, { useEffect } from "react"
import { X, MessageSquarePlus } from "lucide-react"
import FeedbackForm from "@/app/(dashboard)/feedback/FeedbackForm"

interface FeedbackFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackFormModal({ isOpen, onClose }: FeedbackFormModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Scrim */}
      <div
        className="fixed inset-0 bg-canvas/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Drawer Container */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-lg rounded-2xl bg-surface-1 border border-borderStrong p-6 shadow-2xl surface-popover animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-borderSubtle pb-4 mb-5">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent-50 text-accent-400 flex items-center justify-center">
                <MessageSquarePlus className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-textPrimary">Add Manual Feedback</h3>
                <p className="text-xs text-textSecondary">
                  Log customer notes from sales calls, interviews, or emails.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-surface-2 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <FeedbackForm onSuccess={onClose} onCancel={onClose} />
        </div>
      </div>
    </div>
  )
}
