import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/session"

export async function getMembers() {
  const user = await requireAdmin()
  return prisma.user.findMany({
    where: { workspaceId: user.workspaceId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    },
    orderBy: { email: "asc" }
  })
}
