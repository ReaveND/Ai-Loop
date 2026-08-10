"use client"

import React, { useState } from "react"
import { Plus, DownloadCloud, Upload, MessageSquare, ChevronDown, X } from "lucide-react"
import FeedbackFormModal from "@/components/FeedbackFormModal"
import CsvUploader from "@/components/CsvUploader"
import SimulatedChannels from "@/components/SimulatedChannels"

export default function FeedbackActionBar({ canCreate }: { canCreate: boolean }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [importMenuOpen, setImportMenuOpen] = useState(false)
  const [importModalType, setImportModalType] = useState<"csv" | "simulate" | null>(null)

  if (!canCreate) return null

  return (
    <>
      <div className="flex items-center space-x-3">
        {/* Import Data Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setImportMenuOpen(!importMenuOpen)}
            className="inline-flex items-center justify-center px-3.5 py-2 bg-surface-2 hover:bg-surface-3 border border-borderSubtle text-textPrimary text-xs font-medium rounded-lg transition-colors focus-ring"
          >
            <DownloadCloud className="w-3.5 h-3.5 mr-2 text-accent-400" />
            <span>Import data</span>
            <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-textTertiary" />
          </button>

          {importMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-surface-2 border border-borderStrong shadow-2xl p-1.5 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                type="button"
                onClick={() => {
                  setImportMenuOpen(false)
                  setImportModalType("csv")
                }}
                className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary hover:bg-surface-3 rounded-lg transition-colors text-left"
              >
                <Upload className="w-4 h-4 text-accent-400" />
                <div>
                  <p className="text-textPrimary font-semibold">Bulk Upload CSV</p>
                  <p className="text-[11px] text-textTertiary">Upload historical feedback rows</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setImportMenuOpen(false)
                  setImportModalType("simulate")
                }}
                className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary hover:bg-surface-3 rounded-lg transition-colors text-left mt-1"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <div>
                  <p className="text-textPrimary font-semibold">Simulated Channels</p>
                  <p className="text-[11px] text-textTertiary">Generate synthetic test data</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Add Feedback Button */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-accent-500 hover:bg-accent-400 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm focus-ring"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add Feedback</span>
        </button>
      </div>

      {/* Add Feedback Modal Drawer */}
      <FeedbackFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Import Data Modal */}
      {importModalType && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-canvas/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setImportModalType(null)}
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl rounded-2xl bg-surface-1 border border-borderStrong p-6 shadow-2xl surface-popover animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between border-b border-borderSubtle pb-4 mb-5">
                <div>
                  <h3 className="text-base font-semibold text-textPrimary">
                    {importModalType === "csv" ? "Bulk Upload CSV" : "Simulate Customer Channels"}
                  </h3>
                  <p className="text-xs text-textSecondary">
                    {importModalType === "csv"
                      ? "Import exported CSV files from your support or product tools."
                      : "Generate demo customer feedback across multiple B2B channels."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setImportModalType(null)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-surface-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {importModalType === "csv" ? (
                <CsvUploader onUploadComplete={() => setImportModalType(null)} />
              ) : (
                <SimulatedChannels onSimulateComplete={() => setImportModalType(null)} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
