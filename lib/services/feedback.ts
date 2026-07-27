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

export type FeedbackFilters = {
  search?: string
  channel?: string
  sentiment?: string
  theme?: string
  status?: string
  dateRange?: string // e.g., "7d", "30d", "all"
}

export async function getPaginatedFeedback(page: number, limit: number, filters: FeedbackFilters) {
  const user = await requireAuth()
  
  const where: Record<string, unknown> = { workspaceId: user.workspaceId }

  if (filters.search) {
    where.content = { contains: filters.search, mode: 'insensitive' }
  }
  
  if (filters.channel && filters.channel !== 'all') {
    where.channel = filters.channel
  }

  if (filters.status && filters.status !== 'all') {
    where.status = filters.status
  }

  if (filters.sentiment && filters.sentiment !== 'all') {
    where.sentiment = filters.sentiment
  }

  if (filters.dateRange && filters.dateRange !== 'all') {
    const now = new Date()
    const startDate = new Date()
    if (filters.dateRange === '7d') startDate.setDate(now.getDate() - 7)
    else if (filters.dateRange === '30d') startDate.setDate(now.getDate() - 30)
    else if (filters.dateRange === '90d') startDate.setDate(now.getDate() - 90)
    
    where.createdAt = { gte: startDate }
  }

  if (filters.theme && filters.theme !== 'all') {
    where.themes = {
      some: {
        theme: {
          name: filters.theme
        }
      }
    }
  }

  const [data, total] = await Promise.all([
    prisma.feedback.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        themes: {
          include: { theme: true }
        }
      }
    }),
    prisma.feedback.count({ where })
  ])

  return { data, total, page, totalPages: Math.ceil(total / limit) }
}
