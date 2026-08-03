import { prisma } from '../lib/prisma';
import { generateEmbedding } from '../lib/search';

async function main() {
  console.log('Starting to populate embeddings...');

  // 1. Fetch all feedbacks that do NOT have an embedding
  const feedbacks = await prisma.feedback.findMany({
    where: {
      embedding: null, // Only process those missing embeddings
    },
    select: {
      id: true,
      content: true,
    }
  });

  if (feedbacks.length === 0) {
    console.log('No feedbacks found missing embeddings.');
    return;
  }

  console.log(`Found ${feedbacks.length} feedbacks to process.`);

  // 2. Generate and store embeddings for each
  for (let i = 0; i < feedbacks.length; i++) {
    const fb = feedbacks[i];
    console.log(`Processing ${i + 1}/${feedbacks.length}: ${fb.id}`);
    
    try {
      const vector = await generateEmbedding(fb.content);
      const vectorString = `[${vector.join(',')}]`;
      
      // Store using raw query since Prisma driver might not support pgvector natively yet in this setup
      await prisma.$executeRawUnsafe(
        `INSERT INTO "Embedding" ("id", "feedbackId", "vector") VALUES (gen_random_uuid(), '${fb.id}', '${vectorString}'::vector)`
      );
    } catch (e) {
      console.error(`Failed for feedback ${fb.id}:`, e);
    }
  }

  console.log('Finished populating embeddings!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
