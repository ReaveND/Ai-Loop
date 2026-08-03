import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/session"

export async function getDashboardMetrics() {
  const user = await requireAuth()
  
  const now = new Date()
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(now.getDate() - 7)

  // 1. Total Feedback
  const totalFeedback = await prisma.feedback.count({
    where: { workspaceId: user.workspaceId }
  })

  // 2. New This Week
  const newThisWeek = await prisma.feedback.count({
    where: { 
      workspaceId: user.workspaceId,
      createdAt: { gte: sevenDaysAgo }
    }
  })

  // 2b. New Last Week (for spike detection)
  const fourteenDaysAgo = new Date(now)
  fourteenDaysAgo.setDate(now.getDate() - 14)
  const newLastWeek = await prisma.feedback.count({
    where: { 
      workspaceId: user.workspaceId,
      createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo }
    }
  })

  // Calculate spike percentage
  let volumeSpikePercentage = 0;
  if (newLastWeek > 0) {
    volumeSpikePercentage = Math.round(((newThisWeek - newLastWeek) / newLastWeek) * 100)
  } else if (newThisWeek > 0) {
    volumeSpikePercentage = 100 // Spike from 0
  }

  // 3. Negative Percentage
  const totalWithSentiment = await prisma.feedback.count({
    where: { 
      workspaceId: user.workspaceId,
      sentiment: { not: null }
    }
  })
  
  const totalNegative = await prisma.feedback.count({
    where: {
      workspaceId: user.workspaceId,
      sentiment: "Negative"
    }
  })

  // If no sentiment is analyzed yet, use a placeholder 0 or calculate from fake data
  const negativePercentage = totalWithSentiment > 0 
    ? Math.round((totalNegative / totalWithSentiment) * 100) 
    : 0 // Placeholder until AI is added

  // 4. Volume Over Time (Last 30 days, grouped by day)
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(now.getDate() - 30)
  
  const recentFeedback = await prisma.feedback.findMany({
    where: {
      workspaceId: user.workspaceId,
      createdAt: { gte: thirtyDaysAgo }
    },
    select: { createdAt: true }
  })

  const volumeMap = new Map<string, number>()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    volumeMap.set(d.toISOString().split('T')[0], 0)
  }

  recentFeedback.forEach(f => {
    const dateStr = f.createdAt.toISOString().split('T')[0]
    if (volumeMap.has(dateStr)) {
      volumeMap.set(dateStr, volumeMap.get(dateStr)! + 1)
    }
  })

  const volumeData = Array.from(volumeMap.entries()).map(([date, count]) => ({
    date,
    count
  }))

  // 5. Sentiment Breakdown
  const sentimentCounts = await prisma.feedback.groupBy({
    by: ['sentiment'],
    where: {
      workspaceId: user.workspaceId,
      sentiment: { not: null }
    },
    _count: { sentiment: true }
  })

  let sentimentData = sentimentCounts.map(s => ({
    name: (s.sentiment || "Unknown").toUpperCase(),
    value: s._count.sentiment
  }))

  // Use placeholder if no sentiment data
  if (sentimentData.length === 0) {
    sentimentData = [
      { name: "POSITIVE", value: 45 },
      { name: "NEUTRAL", value: 30 },
      { name: "NEGATIVE", value: 25 },
    ]
  }

  // 6. Top Themes
  const themes = await prisma.theme.findMany({
    where: { workspaceId: user.workspaceId },
    include: {
      _count: {
        select: { feedbacks: true }
      }
    },
    orderBy: {
      feedbacks: {
        _count: 'desc'
      }
    },
    take: 5
  })

  let themesData = themes.map(t => ({
    name: t.name,
    count: t._count.feedbacks
  }))

  // Use placeholder if no themes
  if (themesData.length === 0) {
    themesData = [
      { name: "Pricing", count: 120 },
      { name: "Bug/Crash", count: 85 },
      { name: "Feature Request", count: 65 },
      { name: "UX/UI", count: 40 },
      { name: "Customer Support", count: 35 },
    ]
  }

  return {
    totalFeedback,
    newThisWeek,
    volumeSpikePercentage,
    negativePercentage,
    volumeData,
    sentimentData,
    themesData
  }
}
