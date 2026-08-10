import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Clearing existing data...');
  await prisma.feedbackTheme.deleteMany();
  await prisma.embedding.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.user.deleteMany();
  await prisma.workspace.deleteMany();

  console.log('Seeding initial data...');

  const workspace = await prisma.workspace.create({
    data: {
      name: 'Acme Corp',
    },
  });

  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@loop.local',
      passwordHash,
      role: 'ADMIN',
      workspaceId: workspace.id,
    },
  });

  const analyst = await prisma.user.create({
    data: {
      name: 'Analyst User',
      email: 'analyst@loop.local',
      passwordHash,
      role: 'ANALYST',
      workspaceId: workspace.id,
    },
  });

  const viewer = await prisma.user.create({
    data: {
      name: 'Viewer User',
      email: 'viewer@loop.local',
      passwordHash,
      role: 'VIEWER',
      workspaceId: workspace.id,
    },
  });

  // Themes
  const themeData = [
    { name: 'Onboarding', description: 'Feedback about the initial setup and learning curve', color: '#3b82f6', workspaceId: workspace.id },
    { name: 'Pricing', description: 'Feedback related to cost, billing, and subscription tiers', color: '#10b981', workspaceId: workspace.id },
    { name: 'Bugs', description: 'Reports of errors, crashes, and unexpected behavior', color: '#ef4444', workspaceId: workspace.id },
    { name: 'Feature Requests', description: 'Suggestions for new functionality', color: '#8b5cf6', workspaceId: workspace.id },
    { name: 'UI/UX', description: 'Feedback on design, navigation, and usability', color: '#f59e0b', workspaceId: workspace.id },
  ];

  const themes = [];
  for (const t of themeData) {
    const theme = await prisma.theme.create({ data: t });
    themes.push(theme);
  }

  const channels = ['Support Tickets', 'App Store Reviews', 'NPS Surveys', 'Sales Notes'];
  const sentiments = ['Positive', 'Negative', 'Neutral'];
  const statuses = ['NEW', 'REVIEWED', 'ACTIONED'];
  const labels = ['Premium', 'Enterprise', 'Free', 'Pro', null, null];

  console.log('Generating 120 feedback items...');

  const feedbackData = [];
  for (let i = 0; i < 120; i++) {
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const customerLabel = labels[Math.floor(Math.random() * labels.length)];
    
    // random date in the last 60 days
    const daysAgo = Math.floor(Math.random() * 60);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);

    let content = '';
    if (channel === 'Support Tickets') {
       content = sentiment === 'Positive' ? 'Thanks for helping me resolve the login issue so quickly!' : (sentiment === 'Negative' ? 'The app keeps crashing when I try to export my report. Please fix ASAP.' : 'How do I add a new team member?');
    } else if (channel === 'App Store Reviews') {
       content = sentiment === 'Positive' ? 'Great app, very intuitive and fast.' : (sentiment === 'Negative' ? 'Latest update is terrible, too many bugs.' : 'Decent app but missing a few key features like dark mode.');
    } else if (channel === 'NPS Surveys') {
       content = sentiment === 'Positive' ? '10/10 would recommend to a friend.' : (sentiment === 'Negative' ? '0/10 too expensive and hard to use.' : '7/10 it is okay for basic tasks.');
    } else {
       content = sentiment === 'Positive' ? 'Customer loved the new dashboard redesign during our call today.' : (sentiment === 'Negative' ? 'Prospect churned because we do not have SSO.' : 'Client asked about future roadmap items.');
    }
    content += ` (Case #${1000 + i})`;

    feedbackData.push({
      content,
      channel,
      sentiment,
      status,
      customerLabel: customerLabel ?? undefined,
      createdAt,
      workspaceId: workspace.id,
      sentimentScore: sentiment === 'Positive' ? 0.8 : (sentiment === 'Negative' ? -0.8 : 0),
    });
  }

  for (const item of feedbackData) {
    const feedback = await prisma.feedback.create({ data: item });
    
    // Assign 1 or 2 random themes
    const numThemes = Math.floor(Math.random() * 2) + 1;
    const assignedThemes: typeof themes = [];
    while (assignedThemes.length < numThemes) {
       const t = themes[Math.floor(Math.random() * themes.length)];
       if (!assignedThemes.find(at => at.id === t.id)) {
          assignedThemes.push(t);
       }
    }

    for (const t of assignedThemes) {
      await prisma.feedbackTheme.create({
         data: {
            feedbackId: feedback.id,
            themeId: t.id,
            confidence: 0.8 + (Math.random() * 0.2)
         }
      });
    }
  }

  console.log('Seed completed!');
  console.log('Login credentials:');
  console.log('Admin: admin@loop.local / password123');
  console.log('Analyst: analyst@loop.local / password123');
  console.log('Viewer: viewer@loop.local / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
