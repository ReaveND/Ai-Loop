"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Loader2 } from "lucide-react"

export default function ReportGenerateButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  async function handleGenerate() {
    setIsGenerating(true)
    try {
      const res = await fetch("/api/reports", {
        method: "POST"
      })
      
      if (!res.ok) throw new Error("Failed to generate report")
        
      const data = await res.json()
      if (data.id) {
        router.push(`/reports/${data.id}`)
      } else {
        // Just refresh the list
        router.refresh()
      }
    } catch (error) {
      console.error(error)
      alert("Failed to generate report. Check console for details.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className="inline-flex items-center justify-center px-4 py-2 bg-accent-500 hover:bg-accent-400 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-accent-500/20 hover:shadow-accent-500/35 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Plus className="w-4 h-4 mr-2" />
      )}
      <span>{isGenerating ? "Generating Report..." : "Generate New Report"}</span>
    </button>
  )
}


