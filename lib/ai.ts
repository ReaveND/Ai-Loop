import { groq } from '@ai-sdk/groq';
import { generateText, streamText } from 'ai';

export async function classifyFeedback(content: string, existingThemes: string[]) {
  const result = await generateText({
    model: groq('openai/gpt-oss-120b'),
    prompt: `Classify the following customer feedback. 
    
    Existing Themes you should try to reuse: ${existingThemes.join(', ')}
    
    Feedback:
    "${content}"
    
    You MUST respond with ONLY a valid JSON object matching this exact structure, with no markdown formatting or extra text:
    {
      "sentiment": "Positive" | "Negative" | "Neutral",
      "sentimentScore": number between -1 and 1,
      "themes": ["theme1", "theme2"],
      "featureArea": "short label",
      "rationale": "one sentence explanation"
    }`,
  });

  try {
    const text = result.text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON", e);
    throw new Error("AI returned invalid JSON");
  }
}

export async function askLoopGroundedQnA(query: string, contextItems: { id: string, channel: string, customerLabel?: string | null, content: string }[]) {
  const contextStr = contextItems.map(item => `[ID: ${item.id} | Channel: ${item.channel} | Customer: ${item.customerLabel ?? 'Unknown'}]\n${item.content}`).join('\n\n');

  const result = streamText({
    model: groq('openai/gpt-oss-120b'),
    system: `You are LOOP, a customer feedback intelligence assistant. 
You must answer the user's question purely based on the provided feedback context.
If the answer is not present in the context, say so. Do not invent information.
When answering, you MUST cite the specific feedback IDs that support your claims.`,
    prompt: `Context Feedback:\n${contextStr}\n\nUser Question: ${query}`,
  });

  return result;
}

export async function generateVocReport(stats: { total: number, newThisWeek: number, sentimentBreakdown: { name: string, value: number }[], topThemes: { name: string, count: number }[], sampleQuotes: { content: string, sentiment: string | null }[] }) {
  const result = await generateText({
    model: groq('openai/gpt-oss-120b'),
    system: `You are an expert product management assistant. Your job is to write a Voice of Customer (VoC) report based strictly on the provided stats and feedback. Use a professional, executive tone. Format the report cleanly in Markdown. Do not hallucinate numbers or quotes.`,
    prompt: `Here are the exact stats for the period:
Total Feedback: ${stats.total} (${stats.newThisWeek} new this week)

Sentiment Breakdown:
${JSON.stringify(stats.sentimentBreakdown, null, 2)}

Top Themes:
${JSON.stringify(stats.topThemes, null, 2)}

Representative Quotes:
${stats.sampleQuotes.map(q => `- "${q.content}" (Sentiment: ${q.sentiment})`).join('\\n')}

Please write a structured Voice of Customer report including:
1. Executive Summary
2. Key Sentiment Shifts
3. Top Emerging Themes
4. Notable Quotes
5. Recommended Actions`,
  });

  return result.text;
}
