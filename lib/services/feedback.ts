import { prisma } from "@/lib/prisma"
import { requireAuth, requireAnalyst } from "@/lib/session"
import { classifyFeedback } from "@/lib/ai"
import { generateEmbedding } from "@/lib/search"

export async function getFeedback() {
  const user = await requireAuth()
  return prisma.feedback.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { createdAt: "desc" }
  })
}

export async function createFeedback(data: { content: string; channel: string; customerLabel?: string; sourceRef?: string }) {
  const user = await requireAnalyst()
  
  const existingThemes = await prisma.theme.findMany({ where: { workspaceId: user.workspaceId } });
  const themeNames = existingThemes.map(t => t.name);

  let sentiment = null;
  let sentimentScore = null;
  let themes: string[] = [];

  try {
    const classification = await classifyFeedback(data.content, themeNames);
    sentiment = classification.sentiment;
    sentimentScore = classification.sentimentScore;
    themes = classification.themes;
  } catch (error) {
    console.error("Failed to classify feedback:", error);
  }

  const feedback = await prisma.feedback.create({
    data: {
      ...data,
      sentiment,
      sentimentScore,
      workspaceId: user.workspaceId
    }
  })

  if (themes.length > 0) {
    for (const themeName of themes) {
       let theme = await prisma.theme.findFirst({
         where: { name: themeName, workspaceId: user.workspaceId }
       });
       if (!theme) {
         theme = await prisma.theme.create({
           data: { name: themeName, workspaceId: user.workspaceId, color: '#3b82f6' }
         });
       }
       await prisma.feedbackTheme.create({
         data: { feedbackId: feedback.id, themeId: theme.id, confidence: 0.9 }
       });
    }
  }

  try {
    const vector = await generateEmbedding(data.content);
    await prisma.$executeRaw`
      INSERT INTO "Embedding" (id, "feedbackId", vector)
      VALUES (gen_random_uuid()::text, ${feedback.id}, ${vector}::vector)
    `;
  } catch (error) {
    console.error("Failed to generate embedding:", error);
  }

  return feedback;
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
