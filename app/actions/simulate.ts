"use server"

import { prisma } from "@/lib/prisma"
import { requireAnalyst } from "@/lib/session"
import { revalidatePath } from "next/cache"

const templates = {
  "Support Tickets": [
    "I'm having trouble logging in. It keeps saying invalid password.",
    "The new update is great, but the app crashes when I open the settings.",
    "Can you help me update my billing information? The link is broken.",
    "I need a refund for my last purchase. It was accidental.",
    "How do I add a new team member? I don't see the option.",
    "The data export feature is taking too long to process.",
    "I can't seem to find the report from last week.",
    "Is there a way to integrate this with Slack?",
    "The dashboard is not loading properly on my mobile phone.",
    "I need to cancel my subscription."
  ],
  "App Store Reviews": [
    "Love the app! 5 stars.",
    "It's okay, but lacks some advanced features.",
    "Very buggy since the last update.",
    "Great UI, very intuitive and easy to use.",
    "I wish it had a dark mode.",
    "Customer support is excellent.",
    "Too expensive for what it offers.",
    "The offline mode is a lifesaver.",
    "Constant notifications are annoying.",
    "Best app in its category!"
  ],
  "NPS Survey": [
    "10/10 would recommend.",
    "7/10, it's good but can be better.",
    "8/10, very useful for my daily tasks.",
    "5/10, somewhat disappointed with the recent changes.",
    "9/10, almost perfect.",
    "6/10, neutral feeling overall.",
    "10/10, excellent product.",
    "4/10, not what I expected.",
    "8/10, solid performance.",
    "7/10, good value for money."
  ],
  "Sales Notes": [
    "Client is interested in the enterprise plan.",
    "Prospect asked about custom integrations.",
    "Lead wants a demo next week.",
    "Customer is comparing us with a competitor.",
    "Client requested a discount for an annual subscription.",
    "Prospect needs more time to decide.",
    "Customer loves the new features we showed them.",
    "Lead is concerned about data privacy.",
    "Client wants to upgrade their current plan.",
    "Prospect is not ready to buy yet."
  ]
}

export async function simulateFeedbackAction(channel: keyof typeof templates) {
  try {
    const user = await requireAnalyst()
    const contentList = templates[channel]
    
    if (!contentList) {
      return { error: "Invalid channel" }
    }

    const records = []
    // Generate 20-30 records
    const numRecords = Math.floor(Math.random() * 11) + 20
    
    for (let i = 0; i < numRecords; i++) {
      // Pick a random template and add some random variation
      const randomContent = contentList[Math.floor(Math.random() * contentList.length)]
      records.push({
        content: randomContent,
        channel: channel,
        status: Math.random() > 0.8 ? "REVIEWED" : "NEW",
        workspaceId: user.workspaceId,
      })
    }

    await prisma.feedback.createMany({
      data: records
    })

    revalidatePath("/feedback")
    return { success: true, count: records.length }
  } catch (error: unknown) {
    console.error("Simulation error:", error)
    return { error: error instanceof Error ? error.message : "Failed to simulate feedback" }
  }
}
