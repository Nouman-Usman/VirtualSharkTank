# VirtualSharkTank

VirtualSharkTank is a web application (Next.js + TypeScript) that simulates a “Shark Tank” style experience: founders submit pitches, “investors” (mentors, judges, or community members) review, score, comment, and optionally make mock offers or feedback.  
The goal: create an interactive, educational, and data‑driven platform for ideation, feedback loops, and pitch refinement.

> NOTE: Some sections below are forward‑looking because the original repository only contained the default Next.js bootstrap README at the time of writing. Please adjust or remove any assumptions that do not match the actual implementation.

---

## Table of Contents
- [Core Concept](#core-concept)
- [Feature Overview](#feature-overview)
- [High-Level Architecture](#high-level-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure (Proposed)](#project-structure-proposed)
- [Data Model (Proposed)](#data-model-proposed)
- [Environment Variables](#environment-variables)
- [Installation & Development](#installation--development)
- [Available Scripts](#available-scripts)
- [Terminal Workflow Tips](#terminal-workflow-tips)
- [Quality & Tooling](#quality--tooling)
- [State Management Strategy](#state-management-strategy)
- [API Layer & Fetch Strategy](#api-layer--fetch-strategy)
- [Authentication (Planned)](#authentication-planned)
- [Pitch Evaluation & Scoring Extensions](#pitch-evaluation--scoring-extensions)
- [Potential AI / LLM Integrations](#potential-ai--llm-integrations)
- [Accessibility & UX Guidelines](#accessibility--ux-guidelines)
- [Security Considerations](#security-considerations)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Issue Labels (Suggested)](#issue-labels-suggested)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Core Concept
A lightweight platform where:
1. Founders create an account and submit structured pitches.
2. Reviewers (“sharks”) browse, filter, and evaluate pitches.
3. Aggregate scoring provides comparative dashboards.
4. (Optional) Simulated “investment offers” or tiered feedback tokens.
5. Analytics help founders iterate (e.g., clarity score, market viability, differentiation).

---

## Feature Overview
| Category | Current / Planned |
|----------|------------------|
| Pitch Submission | Title, problem, solution, target market, business model, traction. |
| Reviewer Panel | Browse, filter, search pitches. |
| Scoring | Criteria-based (e.g., clarity, feasibility, novelty). |
| Comments | Threaded feedback (moderation ready). |
| Dashboards | Top pitches, trending tags, average score distribution. |
| Tagging | User-defined tags (e.g., SaaS, FinTech, Health). |
| Notifications (Planned) | Email / in-app for new feedback. |
| Export (Planned) | CSV / JSON export for founders. |
| AI Assist (Optional) | Pitch clarity suggestions, summary generation, scoring assist. |

---

## High-Level Architecture
```
(Next.js App Router)
┌────────────────────────────────────┐
│  UI Pages (app/)                  │
│   - Home / Explore                │
│   - Submit Pitch                  │
│   - Pitch Detail                  │
│   - Dashboard (Reviewer)          │
│   - Profile                       │
├────────────────────────────────────┤
│  Components (reusable UI / forms) │
├────────────────────────────────────┤
│  Hooks (data fetching, auth)      │
├────────────────────────────────────┤
│  API Routes (app/api/*)           │
│   - /api/pitches                  │
│   - /api/pitches/[id]             │
│   - /api/reviews                  │
│   - /api/auth/* (if using NextAuth)│
├────────────────────────────────────┤
│  Data Layer (ORM e.g., Prisma)    │
└────────────────────────────────────┘
        | (DB adapter)
        v
   PostgreSQL / SQLite / PlanetScale
```

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | CSS Modules / (Optionally Tailwind or CSS-in-JS) |
| State | React state + (optional) Zustand / Context |
| Forms | React Hook Form (recommended) |
| API | Next.js Route Handlers (`app/api/*`) |
| DB (Planned) | PostgreSQL / Prisma |
| Auth (Planned) | NextAuth.js / OAuth providers |
| Deployment | Vercel |
| Linting | ESLint + TypeScript strict |
| Formatting | Prettier |

---

## Project Structure (Proposed)
```
VirtualSharkTank/
├── app/
│   ├── page.tsx                # Landing / explore
│   ├── submit/                 # Pitch submission UI
│   ├── pitches/[id]/page.tsx   # Pitch detail
│   ├── dashboard/              # Reviewer analytics
│   ├── profile/                # User profile
│   └── api/
│       ├── pitches/route.ts
│       ├── pitches/[id]/route.ts
│       ├── reviews/route.ts
│       └── auth/[...nextauth]/route.ts (if NextAuth)
├── components/
│   ├── PitchCard.tsx
│   ├── PitchForm.tsx
│   ├── ScoreBadge.tsx
│   ├── ReviewerPanel.tsx
│   └── Layout.tsx
├── lib/
│   ├── db.ts
│   ├── validation/
│   ├── scoring/
│   └── ai/
├── hooks/
│   ├── usePitches.ts
│   ├── useReview.ts
│   └── useAuth.ts
├── prisma/
│   └── schema.prisma (if using Prisma)
├── public/
├── styles/
├── scripts/
│   └── seed.ts
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.example
└── README.md
```

---

## Data Model (Proposed)
Example Prisma schema snippet:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(FOUNDER)
  pitches   Pitch[]  @relation("UserPitches")
  reviews   Review[]
  createdAt DateTime @default(now())
}

model Pitch {
  id          String    @id @default(cuid())
  title       String
  summary     String
  problem     String
  solution    String
  market      String?
  businessModel String?
  traction    String?
  tags        String[]
  author      User      @relation("UserPitches", fields: [authorId], references: [id])
  authorId    String
  reviews     Review[]
  createdAt   DateTime  @default(now())
}

model Review {
  id        String   @id @default(cuid())
  pitch     Pitch    @relation(fields: [pitchId], references: [id])
  pitchId   String
  reviewer  User     @relation(fields: [reviewerId], references: [id])
  reviewerId String
  clarity   Int
  feasibility Int
  novelty   Int
  overall   Int
  comment   String?
  createdAt DateTime @default(now())
}

enum Role {
  FOUNDER
  REVIEWER
  ADMIN
}
```

---

## Environment Variables
(Provide an `.env.example`)
```
# App
NEXT_PUBLIC_APP_NAME=VirtualSharkTank
NODE_ENV=development

# Auth (example)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/virtual_shark_tank

# AI Integration (optional)
OPENAI_API_KEY=sk-...
AI_FEATURE_FLAGS=EXPLAIN,RATE
```

---

## Installation & Development
```bash
git clone https://github.com/Nouman-Usman/VirtualSharkTank.git
cd VirtualSharkTank
cp .env.example .env
npm install      # or pnpm install / bun install / yarn
npm run dev
# Open http://localhost:3000
```

Type checking:
```bash
npm run type-check
```

Build & run production locally:
```bash
npm run build
npm run start
```

---

## Available Scripts
| Script | Purpose |
|--------|---------|
| `dev` | Start Next.js dev server |
| `build` | Production build |
| `start` | Run built app |
| `lint` | ESLint codebase |
| `type-check` | Run `tsc --noEmit` |
| `seed` | Seed database (if implemented) |
| `test` | Run test suite (to be added) |

Add to `package.json` as needed:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "seed": "tsx scripts/seed.ts"
  }
}
```

---

## Terminal Workflow Tips
| Task | Command / Tip |
|------|---------------|
| Dependency updates | `npm outdated` then selective upgrade |
| Strict type scan | `npm run type-check` |
| Unused exports | Use `ts-prune` |
| Rapid component dev | Combine `dev` with browser auto-refresh |
| Inspect bundle | `next build && npx next analyse` |
| Lint staged only | `npx lint-staged` (configure pre-commit) |

---

## Quality & Tooling
Recommended dev stack:
- ESLint (with `@typescript-eslint` + `next/core-web-vitals`)
- Prettier (consistent style)
- Husky + lint-staged for gated commits
- Vitest / Jest for unit tests
- Playwright / Cypress for e2e (optional)
- `tsc --noEmit` in CI for strict type enforcement

---

## State Management Strategy
Keep it simple:
- Local component state for forms.
- Server Components + `fetch` for static-ish data.
- Client Components only where interactivity (rating sliders, modals) is required.
- Consider SWR or React Query if you introduce frequent dynamic fetches.

---

## API Layer & Fetch Strategy
| Use Case | Strategy |
|----------|----------|
| Pitch listing (public) | Static / incremental revalidation |
| Pitch detail | Dynamic fetch with caching |
| Authenticated review submission | `POST /api/reviews` (Route Handler) |
| Score aggregation | Pre-compute via DB query or on-demand caching |

---

## Authentication (Planned)
Options:
1. NextAuth.js with:
   - Email link
   - GitHub OAuth
2. Roles enforced via middleware:
```
import { getServerSession } from "next-auth";

export async function requireRole(role: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== role) throw new Error("Unauthorized");
}
```

---

## Pitch Evaluation & Scoring Extensions
Evaluation dimensions (example):
- Clarity (0–10)
- Feasibility
- Novelty
- Market Potential
- Overall (weighted avg)

Future: dynamic weighting via admin UI.

---

## Potential AI / LLM Integrations
| Feature | Description |
|---------|-------------|
| Pitch Summary | Auto-generate concise summary from submission |
| Clarity Suggestions | Identify ambiguous sections |
| Competitive Differentiation | Suggest missing uniqueness points |
| Risk Flags | Highlight unsupported claims |
| Similarity Matching | "Pitches similar to yours" via embedding search |

Prompt skeleton:
```
System: You are a startup pitch analyst.
User: Provide structured JSON: {summary, clarity_feedback, risk_items[], differentiation_suggestions[]}
Pitch: <<< pitch text >>> 
```

---

## Accessibility & UX Guidelines
- Use semantic HTML (landmarks, lists, headings).
- Ensure focus states are visible.
- Color contrast passes WCAG AA.
- Keyboard navigation tested (no keyboard traps).
- Provide ARIA labels for rating controls.

---

## Security Considerations
| Area | Notes |
|------|------|
| Input Validation | Sanitize HTML tags in pitch text (e.g., DOMPurify on client or server). |
| Rate Limiting | Apply to review submissions to prevent spam. |
| AuthZ | Only author can edit their pitch; only reviewers can score. |
| Data Privacy | Avoid exposing reviewer identity unless consented. |
| Secrets | Never commit `.env`; provide `.env.example`. |

---

## Deployment
Vercel recommended:
1. Connect GitHub repo.
2. Set environment variables in Vercel dashboard.
3. Auto deployments on push to `main`.
4. Add preview deployments for PR branches.

Optional self-host:
```bash
docker build -t virtual-shark-tank .
docker run -p 3000:3000 --env-file .env virtual-shark-tank
```

Example Dockerfile (add if needed):
```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Roadmap
| Phase | Items |
|-------|-------|
| v0.1 | Basic pitch submission & listing |
| v0.2 | Reviews, scoring, aggregate stats |
| v0.3 | Auth roles (founder/reviewer) |
| v0.4 | Tag filtering, search |
| v0.5 | AI summarization (optional flag) |
| v0.6 | Pitch similarity recommendations |
| v0.7 | Admin moderation & flagging |
| v1.0 | Public launch + documentation polish |

---

## Contributing
1. Fork & create a feature branch: `feat/<short-name>`
2. Keep changes scoped & atomic.
3. Run quality gate:
```bash
npm run lint
npm run type-check
npm test
```
4. Open PR with:
   - Summary
   - Screenshots (UI changes)
   - Testing notes
   - Any schema changes documented
5. Await review & address feedback.

---

## Issue Labels (Suggested)
| Label | Purpose |
|-------|---------|
| `type:feature` | New functionality |
| `type:bug` | Defect |
| `type:performance` | Optimization |
| `type:design` | UI/UX adjustments |
| `type:ai` | LLM or AI-related work |
| `good first issue` | Beginner friendly |
| `needs clarification` | Awaiting spec |
| `blocked` | External dependency |

