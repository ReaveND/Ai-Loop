import { requireAuth } from "@/lib/session"
import { generateEmbedding, findSimilarFeedback } from "@/lib/search"
import { askLoopGroundedQnA } from "@/lib/ai"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth()
    if (!user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json();
    const fs = require('fs');
    fs.appendFileSync('ask-loop-debug.log', `\\n[Ask LOOP] Request Body: ${JSON.stringify(body, null, 2)}\\n`);

    const { messages } = body;
    const lastMessage = messages[messages.length - 1]

    if (!lastMessage || lastMessage.role !== 'user') {
      return new Response("Invalid request", { status: 400 })
    }

    const queryText = typeof lastMessage.content === 'string' 
      ? lastMessage.content 
      : lastMessage.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('\\n') || '';

    if (!queryText.trim()) {
      return new Response("No text in message", { status: 400 })
    }

    // 1. Generate embedding for user query
    const queryVector = await generateEmbedding(queryText)

    // 2. Semantic search using pgvector
    const relevantFeedback = await findSimilarFeedback(user.workspaceId, queryVector, 10)
    
    // Write debug info to a file we can read
    fs.appendFileSync('ask-loop-debug.log', `\\n[Ask LOOP] User: ${user.email}, Workspace: ${user.workspaceId}\\n[Ask LOOP] Found ${relevantFeedback.length} feedbacks for query: "${queryText}"\\n`);

    // 3. Ask Claude (Groq) with grounded context
    const stream = await askLoopGroundedQnA(queryText, relevantFeedback)

    // 4. Return as UIMessageStreamResponse
    return stream.toUIMessageStreamResponse()
    
  } catch (error) {
    console.error("Ask LOOP Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
