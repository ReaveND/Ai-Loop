# Project LOOP - AI Customer-Feedback Intelligence Platform

Project LOOP is a corporate-grade web application that helps product teams make sense of customer feedback. It automatically ingests, classifies, and clusters feedback (support tickets, app reviews, survey responses) using Claude AI. It then surfaces trends and lets users ask questions against the feedback using semantic search.

This project was built over 4 weeks as part of the Zidio Development Internship program.

## Features
- **Multi-tenant Architecture:** Data is isolated per workspace.
- **Role-Based Access Control:** Admin, Analyst, and Viewer roles limit actions appropriately.
- **AI Classification:** Each ingested feedback item is tagged with sentiment and categorized by themes using Claude.
- **Semantic Search (Ask LOOP):** Uses pgvector embeddings to retrieve relevant feedback and answers plain-English questions, completely grounded in actual customer quotes.
- **Voice of Customer Reports:** Generates executive summaries of weekly trends, sentiment, and quotes via AI.
- **Dashboards:** Recharts visualization for tracking themes and feedback volume.

## Tech Stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + custom design system
- **Database:** PostgreSQL (with `pgvector` extension)
- **ORM:** Prisma
- **Auth:** NextAuth (Auth.js v5)
- **AI:** Anthropic Claude (via AI SDK) + local embeddings
- **Validation:** Zod
- **Deployment:** Vercel

## Local Setup

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database (e.g. Neon, Supabase, or local Docker) with `pgvector` enabled.

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:pass@host/db"
NEXTAUTH_SECRET="a_random_32_char_string"
NEXTAUTH_URL="http://localhost:3000"
GROQ_API_KEY="your_groq_or_anthropic_api_key" # The project uses the AI SDK for Groq/Claude
```

### 3. Install & Seed
```bash
# Install dependencies
npm install

# Push the schema to your database
npx prisma db push

# Seed the database with demo users and 120+ feedback items
npm run seed
```

### 4. Run the App
```bash
npm run dev
```
Open `http://localhost:3000`.

## Demo Credentials
The seed script provisions an isolated demo workspace with 120 feedback items. Use the following accounts to test Role-Based Access Control (RBAC):

- **Admin:** `admin@loop.local` / `password123`
- **Analyst:** `analyst@loop.local` / `password123`
- **Viewer:** `viewer@loop.local` / `password123`

## Architecture Summary
LOOP is a three-tier Next.js App Router application. 
- **Frontend:** React Server and Client Components.
- **API/Backend:** Next.js Route Handlers strictly enforce authentication and scope all queries by `workspaceId`.
- **AI Pipeline:** The backend communicates securely with the Claude API. For the "Ask LOOP" feature, it first performs a vector search against PostgreSQL using `pgvector`, and passes the retrieved rows to the LLM to generate a grounded, hallucination-free answer.
