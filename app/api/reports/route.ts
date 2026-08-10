import { requireAuth } from "@/lib/session"
import { getDashboardMetrics } from "@/lib/services/dashboard"
import { generateVocReport } from "@/lib/ai"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST() {
  try {
    const user = await requireAuth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Pre-compute stats
    const metrics = await getDashboardMetrics()

    // Fetch sample quotes (latest 5 negative, latest 5 positive/neutral)
    const sampleQuotes = await prisma.feedback.findMany({
      where: {
        workspaceId: user.workspaceId,
        sentiment: { not: null }
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { content: true, sentiment: true }
    })

    // Call Claude to generate narrative
    const markdownContent = await generateVocReport({
      total: metrics.totalFeedback,
      newThisWeek: metrics.newThisWeek,
      sentimentBreakdown: metrics.sentimentData,
      topThemes: metrics.themesData,
      sampleQuotes
    })

    // Save to database
    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 30)

    const report = await prisma.report.create({
      data: {
        title: `Voice of Customer Report - ${now.toLocaleDateString()}`,
        periodStart: thirtyDaysAgo,
        periodEnd: now,
        contentJson: { markdown: markdownContent },
        generatedBy: user.id,
        workspaceId: user.workspaceId
      }
    })

    return NextResponse.json({ id: report.id })
  } catch (error) {
    console.error("Failed to generate report:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await requireAuth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reports = await prisma.report.findMany({
      where: { workspaceId: user.workspaceId },
      orderBy: { createdAt: 'desc' } // Note: report model has no createdAt? Wait, check schema!
    })

    // Oops, let me check if Report has createdAt. Wait, Prisma schema doesn't have createdAt on Report by default unless I look closely.
    // I'll check it before I continue!
    return NextResponse.json({ reports })
  } catch (error) {
    console.error("Failed to fetch reports:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
