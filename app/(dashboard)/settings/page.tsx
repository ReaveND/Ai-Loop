import SettingsTabs from "@/components/SettingsTabs"

export default function SettingsPage() {

  return (
    <div className="space-y-6">
      <div className="border-b border-borderSubtle pb-5">
        <h1 className="text-2xl font-bold text-textPrimary mb-1">Workspace Settings</h1>
        <p className="text-sm text-textSecondary">
          Manage your workspace identity, notification alerts, and administrative controls.
        </p>
      </div>

      <SettingsTabs
        workspaceNameDefault="Project LOOP Enterprise"
        workspaceSlugDefault="project-loop"
      />
    </div>
  )
}
