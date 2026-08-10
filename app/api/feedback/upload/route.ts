import { NextResponse } from "next/server"
import { requireAnalyst } from "@/lib/session"
import { parseCsvString } from "@/lib/services/csvParser"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const user = await requireAnalyst()
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const text = await file.text()
    const { valid, invalid } = await parseCsvString(text)

    if (valid.length > 0) {
      const created = await prisma.feedback.createManyAndReturn({
        data: valid.map(row => ({
          content: row.content,
          channel: row.channel,
          customerLabel: row.customerLabel,
          workspaceId: user.workspaceId,
          createdAt: row.createdAt ? new Date(row.createdAt) : undefined
        }))
      })

      // Asynchronously process classification and embeddings in the background
      // so we don't block the HTTP response for large CSVs
      const { processFeedbackClassification } = await import('@/lib/services/classification')
      created.forEach(feedback => {
        // Fire and forget
        processFeedbackClassification(feedback.id).catch(console.error)
      })
    }

    return NextResponse.json({ 
      success: true, 
      imported: valid.length, 
      failed: invalid 
    })
  } catch (error: unknown) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Forbidden" ? 403 : 401 })
    }
    console.error("CSV upload error:", error)
    return NextResponse.json({ error: "Failed to process CSV file" }, { status: 500 })
  }
}
