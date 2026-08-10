"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"

export type ToastVariant = "success" | "warning" | "danger" | "default"

export interface ToastMessage {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

interface ToastContextType {
  toast: (msg: Omit<ToastMessage, "id">) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const toast = useCallback(({ title, description, variant = "success" }: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, title, description, variant }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  useEffect(() => {
    if (toasts.length === 0) return
    const timer = setTimeout(() => {
      setToasts(prev => prev.slice(1))
    }, 4000)
    return () => clearTimeout(timer)
  }, [toasts])

  const getBorderClass = (variant: ToastVariant) => {
    switch (variant) {
      case "success":
        return "border-l-4 border-l-semantic-success"
      case "warning":
        return "border-l-4 border-l-semantic-warning"
      case "danger":
        return "border-l-4 border-l-semantic-danger"
      default:
        return "border-l-4 border-l-accent-500"
    }
  }

  const getIcon = (variant: ToastVariant) => {
    switch (variant) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-semantic-success flex-shrink-0" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-semantic-warning flex-shrink-0" />
      case "danger":
        return <AlertCircle className="w-4 h-4 text-semantic-danger flex-shrink-0" />
      default:
        return <Info className="w-4 h-4 text-accent-400 flex-shrink-0" />
    }
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto bg-surface-2 border border-borderStrong ${getBorderClass(
              t.variant || "default"
            )} rounded-lg p-3.5 shadow-2xl flex items-start space-x-3 animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            <div className="mt-0.5">{getIcon(t.variant || "default")}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-textPrimary leading-snug">{t.title}</p>
              {t.description && (
                <p className="text-xs text-textSecondary mt-0.5 leading-relaxed">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              aria-label="Close notification"
              className="text-textSecondary hover:text-textPrimary transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
