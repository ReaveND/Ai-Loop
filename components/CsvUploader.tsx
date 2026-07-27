"use client"

import { useState } from "react"
import { Upload, FileUp, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export default function CsvUploader({ onUploadComplete }: { onUploadComplete?: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ imported: number, failed: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

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
      if (onUploadComplete) onUploadComplete()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload CSV")
    } finally {
      setLoading(false)
      setFile(null)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
        <Upload className="w-5 h-5 mr-2 text-indigo-500" />
        Bulk Upload CSV
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <input 
            type="file" 
            accept=".csv"
            id="csv-upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <label 
            htmlFor="csv-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <FileUp className="w-4 h-4 mr-2" />
            {file ? file.name : "Select CSV File"}
          </label>
          
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Upload
          </button>
        </div>

        {error && (
          <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}

        {result && (
          <div className="flex items-center space-x-4 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>Successfully imported: <strong>{result.imported}</strong></span>
            <span>Failed rows: <strong>{result.failed}</strong></span>
          </div>
        )}
      </div>
    </div>
  )
}
