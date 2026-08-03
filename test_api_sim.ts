import { prisma } from './lib/prisma';
import { generateEmbedding, findSimilarFeedback } from './lib/search';
import { askLoopGroundedQnA } from './lib/ai';

async function testApi() {
  console.log("Testing API endpoint directly...");
  const users = await prisma.user.findMany();
  if (users.length === 0) return;

  const queryText = "What are users saying about bugs in the latest update?";
  const queryVector = await generateEmbedding(queryText);
  const relevantFeedback = await findSimilarFeedback(users[0].workspaceId, queryVector, 10);
  
  console.log(`Found ${relevantFeedback.length} feedbacks.`);
  if (relevantFeedback.length > 0) {
    console.log("First feedback:", relevantFeedback[0].content);
  }

  const contextStr = relevantFeedback.map(item => `[ID: ${item.id} | Channel: ${item.channel} | Customer: ${item.customerLabel ?? 'Unknown'}]\n${item.content}`).join('\n\n');
  console.log("Context Str length:", contextStr.length);

  try {
    const stream = await askLoopGroundedQnA(queryText, relevantFeedback);
    const text = await stream.text;
    console.log("AI Response:", text);
  } catch (e) {
    console.error("AI Error:", e);
  }
}

testApi().catch(console.error).finally(() => prisma.$disconnect());
