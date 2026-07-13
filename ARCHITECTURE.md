# Phenix Labs Architecture

## Overview

This is a **Sanity-ready corporate website** built with Next.js 16, TypeScript, and Tailwind CSS. The architecture follows strict separation of concerns, enabling seamless migration from mock data to Sanity CMS without modifying UI components.

## Core Principles

1. **Data Layer Independence**: UI components never know where data comes from
2. **Type Safety**: Everything is strongly typed with TypeScript + Zod validation
3. **Server-First**: Uses Server Components by default for optimal performance
4. **Composability**: Reusable design system components
5. **Scalability**: Ready for Sanity CMS integration

## Directory Structure

```
project-root/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── contact/route.ts      # Contact form handler
│   │   └── health/route.ts       # Health check endpoint
│   ├── contact/                  # Contact page
│   │   ├── page.tsx              # Server component
│   │   └── contact-form.tsx      # Client component
│   ├── services/page.tsx         # Services page
│   ├── about/page.tsx            # About page
│   ├── cases/page.tsx            # Case studies page
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── robots.ts                 # SEO robots.txt
│   └── sitemap.ts                # SEO sitemap.xml
│
├── components/                   # Reusable UI components
│   ├── layout/                   # Layout components
│   │   ├── Container.tsx         # Max-width wrapper
│   │   ├── Section.tsx           # Page sections
│   │   ├── Stack.tsx             # Vertical/horizontal stacks
│   │   ├── Grid.tsx              # Responsive grid
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── SiteFooter.tsx        # Footer component
│   │   └── MainLayout.tsx        # Main layout wrapper
│   ├── sections/                 # Page section components
│   │   ├── HeroSection.tsx       # Hero banners
│   │   ├── FeaturesGrid.tsx      # Feature cards grid
│   │   ├── StatsSection.tsx      # Statistics display
│   │   └── ServicesGrid.tsx      # Services showcase
│   ├── cards/                    # Card components
│   ├── forms/                    # Form components
│   ├── common/                   # Common utilities
│   ├── animations/               # Animation components
│   ├── feedback/                 # Loading/empty states
│   └── navigation/               # Navigation elements
│
├── lib/                          # Utilities and helpers
│   ├── data/                     # Data layer
│   │   └── mock.ts               # Mock data functions
│   ├── cms/                      # CMS integration
│   │   ├── config.ts             # CMS configuration
│   │   └── client.ts             # CMS client factory
│   ├── schemas.ts                # Zod validation schemas
│   ├── animations.ts             # Animation utilities
│   ├── types.ts                  # Type definitions
│   └── utils.ts                  # General utilities
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Core types
│
├── public/                       # Static assets
├── app/                          # Root layout files
├── .env.example                  # Environment variables template
├── ARCHITECTURE.md               # This file
└── SETUP_COMPLETE.md             # Setup guide
```

## Data Layer Architecture

### Current: Mock Data

The data layer currently uses mock functions that simulate async data fetching:

```typescript
// lib/data/mock.ts
export async function getHomePage(): Promise<HomePage> {
  // Simulates network delay
  await delay()
  
  return {
    title: '...',
    hero: {...},
    features: [...],
    // ... data structure
  }
}
```

### Future: Sanity Integration

Migration to Sanity requires minimal changes:

1. Update `lib/cms/client.ts` to use Sanity client
2. Create `lib/data/sanity.ts` with Sanity queries
3. No UI component changes needed

```typescript
// Future: lib/data/sanity.ts
import { sanityClient } from '@sanity/client'

export async function getHomePage(): Promise<HomePage> {
  const data = await sanityClient.fetch(`
    *[_type == "homePage"][0] {
      title,
      hero,
      features,
      stats,
      services,
    }
  `)
  return data
}
```

## Component Hierarchy

### Server Components (Default)

All pages and most components are Server Components for optimal performance:

```typescript
// Pages use Server Components
export default async function Home() {
  const data = await getHomePage()
  return <MainLayout navbarData={...} footerData={...}>
    {/* Rendering data-driven components */}
  </MainLayout>
}
```

### Client Components (Only When Needed)

Client components used only for interactivity:

- `ContactFormClient` - Form state management
- `Navbar` - Mobile menu toggle (marked 'use client')
- Animation components - Framer Motion interactions

## Type System

### Core Types (`types/index.ts`)

All data structures are defined as TypeScript interfaces:

```typescript
export interface HomePage {
  title: string
  description: string
  keywords: string[]
  hero: HeroContent
  features: Feature[]
  stats: Stat[]
  services: ServiceItem[]
  cta?: CTASection
}
```

### Validation Schemas (`lib/schemas.ts`)

Zod schemas validate data at runtime:

```typescript
export const HomePageSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  hero: HeroContentSchema,
  features: z.array(FeatureSchema),
  stats: z.array(StatSchema),
  services: z.array(ServiceItemSchema),
})
```

## Data Flow

### Request → Response

```
1. Page component calls getHomePage()
2. Data provider (mock or Sanity) returns typed data
3. Data passed as props to layout components
4. Layout components compose UI without data logic
5. Rendered HTML sent to client
```

### Page Composition Example

```typescript
export default async function Home() {
  // 1. Fetch all required data
  const [navbar, footer, home] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getHomePage(),
  ])

  // 2. Compose layout with typed data
  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HeroSection {...home.hero} />
      <FeaturesGrid features={home.features} />
      <StatsSection stats={home.stats} />
      <ServicesGrid services={home.services} />
    </MainLayout>
  )
}
```

## API Routes

### `/api/contact` (POST)

Handles contact form submissions. Currently logs to console; wire up email service:

```typescript
export async function POST(request: Request) {
  const body = await request.json()
  const validatedData = ContactDataSchema.parse(body)
  
  // TODO: Send email via Resend, SendGrid, etc.
  
  return Response.json({
    success: true,
    message: '...'
  })
}
```

### `/api/health` (GET)

Health check for monitoring and deployments.

## SEO Configuration

### Metadata

Pages export Next.js metadata for SEO:

```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    type: 'website',
  },
}
```

### Robots & Sitemap

- `app/robots.ts` - Controls search engine crawling
- `app/sitemap.ts` - Provides search engines with site structure

## Environment Variables

```env
# CMS Configuration
NEXT_PUBLIC_CMS_PROVIDER=mock  # 'mock' or 'sanity'

# Sanity (when using Sanity)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Base URL (for sitemap, robots, etc.)
NEXT_PUBLIC_BASE_URL=https://phenix-labs.com
```

## Deployment Considerations

### Build Output

Next.js generates fully static HTML for all pages:

```bash
pnpm build
# Output includes:
# - Static pages (Home, Services, About, Cases)
# - API routes (Contact, Health)
# - Optimized images
# - CSS bundles
```

### Performance Optimizations

1. Server Components reduce client-side JavaScript
2. Static generation for content pages
3. Streaming for interactive components
4. Image optimization via Next.js Image
5. CSS-in-JS with Tailwind (no runtime overhead)

### Environment-Based CMS

Deploy to different environments with different CMS providers:

```bash
# Production with Sanity
NEXT_PUBLIC_CMS_PROVIDER=sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=prod_id
pnpm build

# Staging with mock data
NEXT_PUBLIC_CMS_PROVIDER=mock
pnpm build
```

## Extending the Architecture

### Adding a New Page

1. Create page file: `app/new-page/page.tsx`
2. Create mock data function: `lib/data/mock.ts`
3. Create types: Update `types/index.ts`
4. Create validation schema: Update `lib/schemas.ts`
5. Compose page using design system components
6. Mirror in Sanity when CMS is ready

### Adding a New Component

1. Create component file: `components/sections/NewSection.tsx`
2. Define prop interface
3. Accept data as props (never fetch inside component)
4. Use design system primitives (Container, Section, Grid, etc.)
5. Export from `components/index.ts`

### Adding a New API Route

1. Create file: `app/api/endpoint/route.ts`
2. Define request/response schemas with Zod
3. Validate input with schemas
4. Return typed Response

## Migration to Sanity

### Step 1: Install Sanity

```bash
npm install sanity @sanity/client @sanity/structure
```

### Step 2: Configure Client

Update `lib/cms/config.ts`:

```typescript
export const cmsConfig = {
  provider: 'sanity',
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
}
```

### Step 3: Create Data Functions

Create `lib/data/sanity.ts` with queries matching mock data shape

### Step 4: Update Client Factory

Update `lib/cms/client.ts` to import from Sanity:

```typescript
import { createSanityDataProvider } from './sanity'

function createDataProvider(): IDataProvider {
  if (isSanityEnabled()) {
    return createSanityDataProvider()
  }
  return mockData
}
```

### Step 5: Deploy

No UI changes needed. Pages automatically use Sanity data.

## Testing Strategy

### Unit Tests

Test individual components and utilities with Jest/Vitest

### Integration Tests

Test data flow and page composition with Playwright

### E2E Tests

Test complete user journeys with Playwright

## Monitoring

- `/api/health` endpoint for uptime monitoring
- Vercel deployment analytics
- Error tracking (add Sentry for production)
- Performance monitoring (Web Vitals)

## Key Features Checklist

- [x] Type-safe data structures
- [x] Mock data layer
- [x] Reusable components
- [x] SEO optimization
- [x] API routes
- [x] Error handling
- [x] Contact form
- [x] Dark mode support
- [x] Responsive design
- [x] Performance optimized
- [ ] Sanity CMS integration (ready for implementation)
- [ ] Email service integration
- [ ] Analytics setup

## Support

For questions about the architecture or implementation, refer to:

- `DESIGN_SYSTEM.md` - Component documentation
- `COMPONENT_REFERENCE.md` - Component usage guide
- `SETUP_COMPLETE.md` - Setup and configuration
