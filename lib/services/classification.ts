import { prisma } from "@/lib/prisma"
import { classifyFeedback } from "@/lib/ai"
import { generateEmbedding } from "@/lib/search"

export async function processFeedbackClassification(feedbackId: string) {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId }
    })

    if (!feedback) {
      console.error(`Feedback not found: ${feedbackId}`)
      return
    }

    // 1. Get existing themes for the workspace to guide the LLM
    const existingThemes = await prisma.theme.findMany({
      where: { workspaceId: feedback.workspaceId },
      select: { name: true }
    })
    const themeNames = existingThemes.map(t => t.name)

    // 2. Classify feedback using LLM
    const classification = await classifyFeedback(feedback.content, themeNames)

    // 3. Update feedback with sentiment and score
    await prisma.feedback.update({
      where: { id: feedbackId },
      data: {
        sentiment: classification.sentiment,
        sentimentScore: classification.sentimentScore
      }
    })

    // 4. Upsert Themes and Link to Feedback
    for (const themeName of classification.themes) {
      // Find or create theme
      let theme = await prisma.theme.findFirst({
        where: { 
          name: themeName,
          workspaceId: feedback.workspaceId
        }
      })

      if (!theme) {
        theme = await prisma.theme.create({
          data: {
            name: themeName,
            workspaceId: feedback.workspaceId,
            description: `Auto-generated theme for ${themeName}`
          }
        })
      }

      // Link theme to feedback
      await prisma.feedbackTheme.upsert({
        where: {
          feedbackId_themeId: {
            feedbackId: feedback.id,
            themeId: theme.id
          }
        },
        update: {},
        create: {
          feedbackId: feedback.id,
          themeId: theme.id,
          confidence: 0.95 // Default confidence for LLM
        }
      })
    }

    // 5. Generate and store embeddings for semantic search (Ask LOOP)
    try {
      const vector = await generateEmbedding(feedback.content)
      const vectorString = `[${vector.join(',')}]`
      
      // We must use raw SQL for pgvector inserts
      await prisma.$executeRaw`
        INSERT INTO "Embedding" ("id", "feedbackId", "vector")
        VALUES (gen_random_uuid(), ${feedback.id}, ${vectorString}::vector)
        ON CONFLICT ("feedbackId") 
        DO UPDATE SET "vector" = EXCLUDED."vector";
      `
    } catch (embError) {
      console.error(`Failed to generate embedding for ${feedback.id}:`, embError)
    }

    console.log(`Successfully classified and embedded feedback: ${feedback.id}`)
  } catch (error) {
    console.error(`Error processing feedback ${feedbackId}:`, error)
  }
}
