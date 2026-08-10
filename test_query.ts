import { prisma } from './lib/prisma';
import { generateEmbedding, findSimilarFeedback } from './lib/search';

async function test() {
  const users = await prisma.user.findMany();
  console.log('Users:', users.map(u => u.email + ' -> ' + u.workspaceId));

  if (users.length > 0) {
    const qv = await generateEmbedding('my website is not working');
    const fbs = await findSimilarFeedback(users[0].workspaceId, qv, 10);
    console.log(`Found ${fbs.length} feedbacks for workspace ${users[0].workspaceId}`);
    console.log(fbs.map((f: any) => f.content));
  }
}

test().catch(console.error).finally(() => prisma.$disconnect());
