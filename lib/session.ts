import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getCurrentUser() {
  const session = await auth()
  if (!session?.user?.email) return null
  
  // Verify user still exists in DB (protects against stale JWTs after db resets)
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  
  if (!dbUser) return null
  
  return {
    ...session.user,
    role: dbUser.role,
    workspaceId: dbUser.workspaceId
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== "ADMIN") {
    throw new Error("Forbidden")
  }
  return user
}

export async function requireAnalyst() {
  const user = await requireAuth()
  if (user.role !== "ADMIN" && user.role !== "ANALYST") {
    throw new Error("Forbidden")
  }
  return user
}
