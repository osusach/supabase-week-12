# ChileBecas

**ChileBecas** is a comprehensive scholarship discovery platform that helps Chilean students find financial aid opportunities. The platform aggregates scholarship information from universities, foundations, and public institutions into a single, searchable directory with AI-powered assistance.

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Key Features](#key-features)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

## About the Project

### Problem

Scholarship information in Chile is fragmented across multiple institutional websites, making it difficult for students to discover all available financial aid opportunities. Students waste valuable time searching through dozens of sources, often missing deadlines or opportunities that match their profile.

### Solution

ChileBecas centralizes scholarship information into a single, searchable platform with advanced filtering and AI-powered assistance. Students can quickly find relevant scholarships, understand complex eligibility criteria through natural language conversations, and discover opportunities they might have otherwise missed.

### Target Audience

Chilean students seeking undergraduate or graduate financial aid, including:

- High school graduates planning university studies
- Current university students looking for additional funding
- Graduate students seeking advanced degree scholarships
- Students from diverse socioeconomic backgrounds

### Key Features

- **Scholarship Directory** - Browse 100+ scholarships from Chilean universities, foundations, and public institutions with advanced filtering by institution, benefit type (tuition, housing, maintenance), and study level (undergraduate/graduate)
- **AI-Powered Chat Assistant** - RAG-based Q&A system that answers scholarship questions in Spanish

<!-- TODO: Add screenshot of scholarship directory here -->
<!-- TODO: Add screenshot of AI chat assistant interface here -->

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Shadcn
- TailwindCSS

### Backend & Database

- Supabase (PostgreSQL, Vector Store)

### AI

- OpenAI (GPT-4o-mini, text-embedding-3-small)
- LangChain
- Vercel AI SDK
- LangSmith

### Development Tools

- pnpm
- ESLint
- Prettier
- Supabase CLI

### Deployment

- Vercel
- GitHub Actions

## Getting Started

### Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org))
- **pnpm** 10+ (Install: `npm install -g pnpm`)
- **Docker** ([Download](https://www.docker.com/products/docker-desktop)) - Required for local Supabase
- **Supabase CLI** ([Installation guide](https://supabase.com/docs/guides/cli))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/osusach/supabase-week-12.git
cd supabase-week-12
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start local Supabase**

This starts a local PostgreSQL database with all Supabase services (no cloud account needed):

```bash
supabase start
```

This will output your local credentials. Copy the `API URL` and `Publishable Key` for the next step.

4. **Set up environment variables**

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Add your local Supabase credentials and OpenAI API key:

```env
# Supabase (from `supabase start` output)
SUPABASE_URL=your_api_url
SUPABASE_PUBLISHABLE_KEY=your_publishable_key

# OpenAI (Required for AI chat assistant)
# Get your key at https://platform.openai.com
OPENAI_API_KEY=your_openai_api_key
```

**Note:** Only the OpenAI API key requires an external account. The scholarship directory works without it, but the AI chat assistant requires it.

5. **Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Stopping Local Services

```bash
supabase stop
```

## Development

### Available Scripts

- **`pnpm dev`** - Start development server with Turbopack
- **`pnpm build`** - Create production build
- **`pnpm start`** - Start production server
- **`pnpm lint`** - Run ESLint to check code quality
- **`pnpm lint:fix`** - Automatically fix ESLint issues
- **`pnpm format`** - Format code with Prettier
- **`pnpm format:check`** - Check if code is formatted correctly
- **`pnpm generate:types`** - Generate TypeScript types from Supabase schema

### Project Structure

```
supabase-week-12/
├── app/                      # Next.js App Router (pages and API routes)
├── components/               # React components
├── lib/                      # Shared utilities and business logic
├── utils/                    # Utility functions
├── types/                    # TypeScript type definitions
├── supabase/                 # Supabase configuration and migrations
└── public/                   # Static assets
```

## Key Features

### AI-Powered Chat Assistant

The scholarship assistant uses a **Retrieval-Augmented Generation (RAG)** pipeline to answer questions about scholarships in Spanish:

- **Vector Search** - Uses OpenAI's text-embedding-3-small model to embed scholarship documents into a pgvector database for semantic search
- **Self-Querying Retriever** - Automatically extracts filters from user questions to retrieve relevant scholarship information
- **LangChain Orchestration** - Chains together retrieval, context injection, and generation steps
- **GPT-4o-mini** - Generates natural, conversational responses in Spanish based on retrieved scholarship data
- **Streaming Responses** - Implements Vercel AI SDK for real-time token streaming, providing immediate feedback to users
- **Conversation History** - Maintains context across multiple questions for coherent multi-turn conversations

**Implementation**: The chat system is implemented in `/app/api/ask/route.ts` with vector store utilities in `/utils/supabase/vector-store.ts`. The system retrieves relevant scholarship documents based on semantic similarity, injects them into the prompt context, and generates answers that cite specific scholarships.

### Scholarship Directory & Advanced Filtering

Browse and filter through 100+ scholarship opportunities with powerful search capabilities:

**Core Features:**

- **Multi-dimensional Filtering**
  - Institution filter (10+ Chilean universities and organizations)
  - Benefit type (tuition coverage, housing support, maintenance stipends, other benefits)
  - Study level (undergraduate, graduate programs)
  - Real-time text search with debouncing (500ms delay) for optimal performance
- **URL-based Filter State** - Filters are encoded in the URL, enabling shareable links to specific filtered views
- **Infinite Scroll Pagination** - Loads 12 scholarships per page with intersection observer for smooth infinite scrolling
- **Responsive Grid Layout** - Adapts from 1 column (mobile) to 3 columns (desktop) with institution logos and benefit badges
- **Institution Logos** - Visual recognition with university and organization branding

**User Experience:**

- Filter selections persist across page reloads via URL parameters
- Clear all filters option for quick reset
- Loading states with skeleton screens during data fetching
- Empty states with helpful messages when no scholarships match filters

**Implementation**: The directory page is built in `/app/scholarships/page.tsx` with filter components in `/components/filters/` and data fetching logic in `/lib/queries/scholarships.ts`. Filtering is handled server-side with Supabase queries for optimal performance.

## Roadmap

Future enhancements planned for ChileBecas:

- [ ] **Personalized Matching System** - AI-powered scholarship recommendations based on student profiles (academic background, interests, financial need)
- [ ] **Improved Development Experience** - Seed data for immediate local development, better documentation for contributors
- [ ] **Scholarship Deadline Notifications** - Email and in-app notifications for upcoming deadlines with calendar integration (Google Calendar, iCal)
- [ ] **Scholarship Comparison Tool** - Side-by-side comparison of multiple scholarships to help students make informed decisions
- [ ] **Email Digest System** - Weekly or monthly digest of new scholarships matching student profiles

## Contributing

We welcome contributions from the community! To contribute:

1. **Fork the repository** and create a feature branch

```bash
git checkout -b feat/your-feature-name
```

2. **Make your changes** following the code standards

3. **Format and lint your code** before committing

```bash
pnpm format
pnpm lint:fix
```

4. **Commit your changes** using conventional commit format

```bash
git commit -m "feat: add new filter for scholarship regions"
```

Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

5. **Push to your fork** and submit a pull request

```bash
git push origin feat/your-feature-name
```

### Pull Request Guidelines

- Keep PRs small and focused on a single feature or fix
- Write clear, descriptive PR titles and descriptions
- Include screenshots for UI changes
- Ensure all tests pass and code is properly formatted
- Reference related issues in the PR description
