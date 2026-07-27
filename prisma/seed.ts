import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding initial data...');

  // 1. Create a Workspace
  // const workspace = await prisma.workspace.create({
  //   data: {
  //     name: 'Demo Workspace',
  //   },
  // });

  // 2. Create an Admin User
  // const passwordHash = await bcrypt.hash('password123', 10);
  // const admin = await prisma.user.create({
  //   data: {
  //     name: 'Admin User',
  //     email: 'admin@loop.local',
  //     passwordHash,
  //     role: 'ADMIN',
  //     workspaceId: workspace.id,
  //   },
  // });

  // console.log(`Created Workspace: ${workspace.name}`);
  // console.log(`Created Admin User: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
