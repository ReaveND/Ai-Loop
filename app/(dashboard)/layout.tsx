import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import DashboardShell from "@/components/DashboardShell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  return (
    <DashboardShell
      user={{
        name: user.name || null,
        email: user.email || "",
        role: user.role || "ANALYST",
      }}
    >
      {children}
    </DashboardShell>
  )
}
