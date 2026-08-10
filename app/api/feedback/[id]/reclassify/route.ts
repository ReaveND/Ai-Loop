import { NextResponse } from "next/server"
import { requireAnalyst } from "@/lib/session"
import { processFeedbackClassification } from "@/lib/services/classification"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAnalyst()
    const { id } = params
    
    // We run it asynchronously so we don't block the UI
    processFeedbackClassification(id).catch(console.error)
    
    return NextResponse.json({ success: true, message: "Re-classification triggered" })
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Failed to re-classify" }, 
      { status: err.message === "Forbidden" ? 403 : 401 }
    )
  }
}
