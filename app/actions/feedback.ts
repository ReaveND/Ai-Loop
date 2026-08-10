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

export async function reclassifyFeedbackAction(id: string) {
  try {
    const user = await requireAnalyst()
    const feedback = await prisma.feedback.findUnique({ where: { id } })
    
    if (!feedback || feedback.workspaceId !== user.workspaceId) {
      return { error: "Feedback not found or access denied" }
    }

    const { classifyFeedback } = await import("@/lib/ai")
    const { generateEmbedding } = await import("@/lib/search")

    const existingThemes = await prisma.theme.findMany({ where: { workspaceId: user.workspaceId } });
    const themeNames = existingThemes.map(t => t.name);

    const classification = await classifyFeedback(feedback.content, themeNames);
    
    // Clear old themes
    await prisma.feedbackTheme.deleteMany({ where: { feedbackId: id } });


    if (classification.themes.length > 0) {
      for (const themeName of classification.themes) {
         let theme = await prisma.theme.findFirst({
           where: { name: themeName, workspaceId: user.workspaceId }
         });
         if (!theme) {
           theme = await prisma.theme.create({
             data: { name: themeName, workspaceId: user.workspaceId, color: '#3b82f6' }
           });
         }
         await prisma.feedbackTheme.create({
           data: { feedbackId: id, themeId: theme.id, confidence: 0.9 }
         });
      }
    }

    await prisma.feedback.update({
      where: { id },
      data: {
        sentiment: classification.sentiment,
        sentimentScore: classification.sentimentScore
      }
    });

    try {
      const vector = await generateEmbedding(feedback.content);
      // Upsert the embedding
      await prisma.$executeRaw`
        INSERT INTO "Embedding" (id, "feedbackId", vector)
        VALUES (gen_random_uuid()::text, ${id}, ${vector}::vector)
        ON CONFLICT ("feedbackId") 
        DO UPDATE SET vector = ${vector}::vector
      `;
    } catch (e) {
      console.error("Failed to generate embedding during re-classify", e);
    }

    revalidatePath("/feedback")
    return { success: true }
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed to re-classify feedback" }
  }
}
