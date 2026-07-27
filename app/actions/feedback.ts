"use server"

import { prisma } from "@/lib/prisma"
import { requireAnalyst } from "@/lib/session"
import { revalidatePath } from "next/cache"

export async function updateFeedbackStatusAction(id: string, status: string) {
  try {
    const user = await requireAnalyst()
    
    // Ensure the feedback belongs to the user's workspace
    const feedback = await prisma.feedback.findUnique({
      where: { id }
    })

    if (!feedback || feedback.workspaceId !== user.workspaceId) {
      return { error: "Feedback not found or access denied" }
    }

    await prisma.feedback.update({
      where: { id },
      data: { status }
    })

    revalidatePath("/feedback")
    return { success: true }
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed to update status" }
  }
}
