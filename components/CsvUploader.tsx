"use client"

import { useState } from "react"
import { Upload, FileUp, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

export default function CsvUploader({ onUploadComplete }: { onUploadComplete?: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ imported: number; failed: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/feedback/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload CSV")
      }

      setResult({ imported: data.imported, failed: data.failed })
      toast({
        title: "CSV Uploaded",
        description: `${data.imported} records imported successfully.`,
        variant: "success",
      })
      if (onUploadComplete) onUploadComplete()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload CSV"
      setError(msg)
      toast({
        title: "Upload failed",
        description: msg,
        variant: "danger",
      })
    } finally {
      setLoading(false)
      setFile(null)
    }
  }

  return (
    <div className="bg-surface-1 p-5 rounded-xl border border-borderSubtle shadow-sm">
      <h3 className="text-sm font-semibold text-textPrimary mb-3 flex items-center">
        <Upload className="w-4 h-4 mr-2 text-accent-400" />
        Bulk Upload CSV
      </h3>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept=".csv"
            id="csv-upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <label
            htmlFor="csv-upload"
            className="cursor-pointer inline-flex items-center px-3.5 py-2 bg-surface-2 border border-borderSubtle text-textSecondary hover:text-textPrimary hover:bg-surface-3 rounded-lg text-xs font-medium transition-colors focus-ring"
          >
            <FileUp className="w-4 h-4 mr-2 text-textTertiary" />
            <span className="truncate max-w-[180px]">{file ? file.name : "Select CSV File"}</span>
          </label>

          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || loading}
            className="inline-flex items-center px-4 py-2 bg-accent-500 text-white rounded-lg text-xs font-semibold hover:bg-accent-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm focus-ring"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : null}
            <span>Upload & Parse</span>
          </button>
        </div>

        {error && (
          <div className="flex items-center text-xs text-semantic-danger bg-semantic-danger-bg border border-semantic-danger/30 p-2.5 rounded-lg">
            <AlertCircle className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="flex items-center space-x-3 text-xs bg-semantic-success-bg border border-semantic-success/30 text-semantic-success p-2.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              Successfully imported: <strong className="font-mono">{result.imported}</strong>
            </span>
            <span>
              Failed rows: <strong className="font-mono">{result.failed}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
