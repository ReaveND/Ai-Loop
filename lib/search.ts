import { pipeline } from '@xenova/transformers';
import { prisma } from './prisma';

// Singleton to avoid re-loading the model for every request
class PipelineSingleton {
  static task = 'feature-extraction' as const;
  static model = 'Xenova/all-MiniLM-L6-v2';
  static instance: any = null;

  static async getInstance(progress_callback: any = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const extractor = await PipelineSingleton.getInstance();
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

export async function findSimilarFeedback(workspaceId: string, queryVector: number[], limit = 10) {
  const vectorString = `[${queryVector.join(',')}]`;

  // Use Prisma's raw query to do pgvector cosine similarity search
  // pgvector uses `<=>` for cosine distance
  const result = await prisma.$queryRaw`
    SELECT 
      f.id, 
      f.content, 
      f."customerLabel", 
      f.channel,
      e.vector <=> ${vectorString}::vector as distance
    FROM "Feedback" f
    JOIN "Embedding" e ON f.id = e."feedbackId"
    WHERE f."workspaceId" = ${workspaceId}
    ORDER BY distance ASC
    LIMIT ${limit}
  `;
  
  return result as any[];
}
