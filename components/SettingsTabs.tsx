"use client"

import React, { useState } from "react"
import {
  Building2,
  Bell,
  AlertTriangle,
  Upload,
  Trash2,
  Loader2,
  X,
} from "lucide-react"
import { useToast } from "@/components/ToastProvider"

export default function SettingsTabs({
  workspaceNameDefault = "Project LOOP Enterprise",
  workspaceSlugDefault = "project-loop",
}: {
  workspaceNameDefault?: string
  workspaceSlugDefault?: string
}) {
  const [activeTab, setActiveTab] = useState<"workspace" | "notifications" | "danger">("workspace")
  const [workspaceName, setWorkspaceName] = useState(workspaceNameDefault)
  const [workspaceSlug, setWorkspaceSlug] = useState(workspaceSlugDefault)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [savingWorkspace, setSavingWorkspace] = useState(false)

  // Notification toggles
  const [emailDigest, setEmailDigest] = useState(true)
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [slackNotifications, setSlackNotifications] = useState(false)

  // Danger zone delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteInput, setDeleteInput] = useState("")

  const { toast } = useToast()

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault()
    setSavingWorkspace(true)
    setTimeout(() => {
      setSavingWorkspace(false)
      toast({
        title: "Workspace updated",
        description: "Your workspace settings and branding have been saved.",
        variant: "success",
      })
    }, 600)
  }

  const handleDeleteWorkspace = () => {
    if (deleteInput !== workspaceName) return
    toast({
      title: "Workspace delete simulated",
      description: "Delete workspace action invoked (Demo mode).",
      variant: "danger",
    })
    setShowDeleteModal(false)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left-Aligned Tabs Navigation */}
      <nav className="w-full md:w-64 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-borderSubtle pb-4 md:pb-0 md:pr-4">
        <button
          type="button"
          onClick={() => setActiveTab("workspace")}
          className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
            activeTab === "workspace"
              ? "bg-accent-50 text-accent-400 border-l-2 border-accent-400"
              : "text-textSecondary hover:text-textPrimary hover:bg-surface-2"
          }`}
        >
          <Building2 className="w-4 h-4 flex-shrink-0" />
          <span>Workspace</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
            activeTab === "notifications"
              ? "bg-accent-50 text-accent-400 border-l-2 border-accent-400"
              : "text-textSecondary hover:text-textPrimary hover:bg-surface-2"
          }`}
        >
          <Bell className="w-4 h-4 flex-shrink-0" />
          <span>Notifications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("danger")}
          className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
            activeTab === "danger"
              ? "bg-semantic-danger-bg text-semantic-danger border-l-2 border-semantic-danger"
              : "text-textSecondary hover:text-semantic-danger hover:bg-surface-2"
          }`}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>Danger Zone</span>
        </button>
      </nav>

      {/* Tab Content Panels */}
      <div className="flex-1 max-w-3xl">
        {/* TAB 1: WORKSPACE */}
        {activeTab === "workspace" && (
          <div className="bg-surface-1 p-6 rounded-2xl border border-borderSubtle shadow-sm space-y-6">
            <div className="border-b border-borderSubtle pb-4">
              <h3 className="text-base font-semibold text-textPrimary">Workspace Profile</h3>
              <p className="text-xs text-textSecondary mt-0.5">
                Configure your workspace identity, custom URL slug, and brand logo.
              </p>
            </div>

            <form onSubmit={handleSaveWorkspace} className="space-y-6">
              {/* Logo Upload Dropzone & Preview */}
              <div>
                <label className="block text-xs font-medium text-textSecondary mb-2">
                  Workspace Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-borderStrong flex items-center justify-center overflow-hidden shadow-inner flex-shrink-0">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-accent-400">
                        {workspaceName.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-borderSubtle text-xs font-medium text-textPrimary cursor-pointer transition-colors focus-ring">
                      <Upload className="w-3.5 h-3.5 mr-1.5 text-accent-400" />
                      <span>Upload Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setLogoPreview(URL.createObjectURL(file))
                            toast({
                              title: "Logo uploaded",
                              description: "Custom workspace logo selected.",
                            })
                          }
                        }}
                      />
                    </label>
                    <p className="text-[11px] text-textTertiary">
                      Recommended size: 256x256px PNG or SVG.
                    </p>
                  </div>
                </div>
              </div>

              {/* Workspace Name Input */}
              <div>
                <label className="block text-xs font-medium text-textSecondary mb-1.5">
                  Workspace Name
                </label>
                <input
                  type="text"
                  required
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm focus:outline-none input-glow"
                />
              </div>

              {/* URL Slug Preview */}
              <div>
                <label className="block text-xs font-medium text-textSecondary mb-1.5">
                  Workspace URL Slug
                </label>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-borderSubtle bg-surface-3 text-xs text-textSecondary font-mono select-none">
                    https://app.loop.ai/w/
                  </span>
                  <input
                    type="text"
                    required
                    value={workspaceSlug}
                    onChange={(e) => setWorkspaceSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 px-3.5 py-2 rounded-r-lg border border-borderSubtle bg-surface-2 text-textPrimary text-sm font-mono focus:outline-none input-glow"
                  />
                </div>
                <p className="text-[11px] text-textTertiary mt-1">
                  Changing your workspace URL slug will invalidate old bookmark links.
                </p>
              </div>

              <div className="pt-4 border-t border-borderSubtle flex justify-end">
                <button
                  type="submit"
                  disabled={savingWorkspace}
                  className="inline-flex items-center px-5 py-2 bg-accent-500 hover:bg-accent-400 text-white font-semibold text-xs rounded-lg transition-all shadow-sm disabled:opacity-50 focus-ring"
                >
                  {savingWorkspace ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Workspace Settings</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div className="bg-surface-1 p-6 rounded-2xl border border-borderSubtle shadow-sm space-y-6">
            <div className="border-b border-borderSubtle pb-4">
              <h3 className="text-base font-semibold text-textPrimary">Notification Preferences</h3>
              <p className="text-xs text-textSecondary mt-0.5">
                Control when and how LOOP alerts you to emerging customer sentiment.
              </p>
            </div>

            <div className="space-y-6 divide-y divide-borderSubtle">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between pt-4 first:pt-0">
                <div>
                  <h4 className="text-sm font-semibold text-textPrimary">Daily Email Digest</h4>
                  <p className="text-xs text-textSecondary mt-0.5">
                    Receive a morning summary of incoming feedback and AI theme trends.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmailDigest(!emailDigest)
                    toast({
                      title: "Notification updated",
                      description: `Daily digest turned ${!emailDigest ? "ON" : "OFF"}.`,
                    })
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative focus-ring ${
                    emailDigest ? "bg-accent-500" : "bg-surface-3 border border-borderStrong"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-150 ${
                      emailDigest ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between pt-6">
                <div>
                  <h4 className="text-sm font-semibold text-textPrimary">
                    Critical Sentiment Alert
                  </h4>
                  <p className="text-xs text-textSecondary mt-0.5">
                    Immediate alert when a sudden spike in negative customer feedback occurs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCriticalAlerts(!criticalAlerts)
                    toast({
                      title: "Notification updated",
                      description: `Critical sentiment alerts turned ${
                        !criticalAlerts ? "ON" : "OFF"
                      }.`,
                    })
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative focus-ring ${
                    criticalAlerts ? "bg-accent-500" : "bg-surface-3 border border-borderStrong"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-150 ${
                      criticalAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between pt-6">
                <div>
                  <h4 className="text-sm font-semibold text-textPrimary">Slack Broadcasts</h4>
                  <p className="text-xs text-textSecondary mt-0.5">
                    Post newly actioned feedback items to your team #customer-feedback channel.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSlackNotifications(!slackNotifications)
                    toast({
                      title: "Notification updated",
                      description: `Slack broadcast notifications turned ${
                        !slackNotifications ? "ON" : "OFF"
                      }.`,
                    })
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative focus-ring ${
                    slackNotifications ? "bg-accent-500" : "bg-surface-3 border border-borderStrong"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-150 ${
                      slackNotifications ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DANGER ZONE */}
        {activeTab === "danger" && (
          <div className="bg-semantic-danger-bg p-6 rounded-2xl border border-semantic-danger/40 space-y-6">
            <div className="border-b border-semantic-danger/30 pb-4">
              <h3 className="text-base font-semibold text-semantic-danger">Danger Zone</h3>
              <p className="text-xs text-semantic-danger/80 mt-0.5">
                Irreversible administrative actions for your workspace. Proceed with caution.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-textPrimary">Delete Workspace</h4>
                <p className="text-xs text-textSecondary mt-0.5">
                  Permanently remove this workspace, all member accounts, and all feedback records.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center justify-center px-4 py-2 bg-semantic-danger hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm focus-ring"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                <span>Delete Workspace</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-canvas/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setShowDeleteModal(false)}
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-surface-1 border border-borderStrong p-6 shadow-2xl surface-popover animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
              <div className="flex items-center justify-between border-b border-borderSubtle pb-3">
                <div className="flex items-center space-x-2 text-semantic-danger">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="text-base font-bold">Confirm Workspace Deletion</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 rounded text-textSecondary hover:text-textPrimary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-textSecondary leading-relaxed">
                This action <strong className="text-textPrimary font-semibold">cannot</strong> be undone. To confirm, please type{" "}
                <strong className="font-mono text-accent-400 bg-surface-2 px-1.5 py-0.5 rounded border border-borderSubtle">
                  {workspaceName}
                </strong>{" "}
                below:
              </p>

              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder={`Type "${workspaceName}" to confirm`}
                className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle bg-surface-2 text-textPrimary text-xs font-mono focus:outline-none input-glow"
              />

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-borderSubtle">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-xs font-medium text-textSecondary hover:text-textPrimary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteInput !== workspaceName}
                  onClick={handleDeleteWorkspace}
                  className="px-4 py-2 bg-semantic-danger hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Permanently Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
