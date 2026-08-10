import { prisma } from "../lib/prisma"
import { processFeedbackClassification } from "../lib/services/classification"

async function main() {
  console.log("Starting background classification backfill...")
  
  // Find all feedbacks that have no sentiment (meaning they haven't been classified)
  const unclassified = await prisma.feedback.findMany({
    where: { sentiment: null },
    select: { id: true }
  })
  
  console.log(`Found ${unclassified.length} unclassified feedback items.`)
  
  let processed = 0
  for (const { id } of unclassified) {
    console.log(`Processing ${id} (${processed + 1}/${unclassified.length})...`)
    await processFeedbackClassification(id)
    processed++
  }
  
  console.log("Backfill complete!")
}

main()
  .catch(e => {
    console.error("Backfill failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
