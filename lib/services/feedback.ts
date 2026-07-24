import { prisma } from "@/lib/prisma"
import { requireAuth, requireAnalyst } from "@/lib/session"

export async function getFeedback() {
  const user = await requireAuth()
  return prisma.feedback.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { createdAt: "desc" }
  })
}

export async function createFeedback(data: { content: string; channel: string; customerLabel?: string; sourceRef?: string }) {
  const user = await requireAnalyst()
  return prisma.feedback.create({
    data: {
      ...data,
      workspaceId: user.workspaceId
    }
  })
}
