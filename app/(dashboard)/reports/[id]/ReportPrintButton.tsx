"use client"

import { Printer } from "lucide-react"

export default function ReportPrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center justify-center px-4 py-2 bg-surface-2 border border-borderSubtle hover:bg-surface-3 hover:text-textPrimary text-textSecondary text-sm font-semibold rounded-xl transition-all duration-200 focus-ring"
    >
      <Printer className="w-4 h-4 mr-2" />
      <span>Export PDF</span>
    </button>
  )
}
