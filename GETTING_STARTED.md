# Getting Started - Phenix Labs

This guide will help you understand and work with the Phenix Labs website architecture.

## Project Overview

**Phenix Labs** is a **Sanity-ready corporate website** built with:
- **Next.js 16** - React framework with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Zod** - Runtime validation schemas
- **Mock Data Layer** - Ready for Sanity CMS integration

### Key Features

✅ Complete design system with 24 reusable components  
✅ Type-safe data structures (TypeScript + Zod)  
✅ SEO optimized (robots.txt, sitemap.xml, metadata)  
✅ Contact form with API route  
✅ Mobile-responsive design  
✅ Dark mode support  
✅ Production-ready build (all pages pre-rendered)  

## Project Structure

```
app/                    # Pages and layouts
├── page.tsx           # Home page
├── services/page.tsx  # Services page
├── about/page.tsx     # About page
├── cases/page.tsx     # Case studies page
├── contact/           # Contact page with form
├── api/               # API routes
├── layout.tsx         # Root layout with fonts
├── error.tsx          # Error boundary
└── not-found.tsx      # 404 page

components/           # Reusable UI components
├── layout/           # Layout components (Container, Section, Grid, etc.)
├── sections/         # Page sections (Hero, Features, Stats, Services)
├── cards/            # Card components
├── forms/            # Form inputs
└── ... 6 more folders with utilities

lib/                  # Business logic
├── data/            # Data layer
│   └── mock.ts      # Mock data functions (replace with Sanity queries)
├── cms/             # CMS integration
│   ├── config.ts    # CMS configuration
│   └── client.ts    # CMS client factory
├── schemas.ts       # Zod validation schemas
└── animations.ts    # Animation utilities

types/               # TypeScript types
└── index.ts        # All data type definitions
```

## Running the Project

### Development

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to see the site in development mode.

### Production Build

```bash
pnpm build
pnpm start
```

All pages are pre-rendered as static HTML for optimal performance.

## How Data Flows

### Current Architecture (Mock Data)

```
Page Component (Server Component)
    ↓
getHomePage() / getServicesPage() / etc.
    ↓
Mock Data (lib/data/mock.ts)
    ↓
UI Components (receive data as props)
    ↓
Rendered HTML
```

### Future Architecture (Sanity CMS)

```
Page Component (Server Component)
    ↓
getHomePage() / getServicesPage() / etc.
    ↓
Sanity Queries (lib/data/sanity.ts) ← NEW
    ↓
UI Components (receive data as props - NO CHANGES!)
    ↓
Rendered HTML
```

The UI components will work exactly the same. Only the data source changes.

## Key Concepts

### 1. Server Components by Default

All pages use Server Components for optimal performance:

```typescript
// ✅ This is a Server Component (default)
export default async function Home() {
  const data = await getHomePage()
  return <YourComponent data={data} />
}
```

Client components are only used when interactivity is required:

```typescript
// 🚫 Rare - only when you need onClick, useState, etc.
'use client'
export function InteractiveForm() {
  // ...
}
```

### 2. Data Types

Everything is strongly typed. All data structures are defined in `types/index.ts`:

```typescript
export interface HomePage {
  title: string
  hero: HeroContent
  features: Feature[]
  stats: Stat[]
  services: ServiceItem[]
  cta?: CTASection
}
```

### 3. Validation with Zod

Runtime validation ensures data integrity:

```typescript
// lib/schemas.ts
export const HomePageSchema = z.object({
  title: z.string(),
  hero: HeroContentSchema,
  features: z.array(FeatureSchema),
  // ...
})

// Usage in API routes
const validatedData = HomePageSchema.parse(body)
```

### 4. Composable Components

Pages compose reusable components without business logic:

```typescript
export default async function Home() {
  const data = await getHomePage()
  
  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HeroSection {...data.hero} />
      <FeaturesGrid features={data.features} />
      <StatsSection stats={data.stats} />
      <ServicesGrid services={data.services} />
    </MainLayout>
  )
}
```

## Adding New Content

### Option 1: Update Mock Data

Edit `lib/data/mock.ts` to add new content:

```typescript
export async function getHomePage(): Promise<HomePage> {
  return {
    // ... update data here
  }
}
```

### Option 2: Add a New Page

1. Create `app/new-page/page.tsx`
2. Create mock data function in `lib/data/mock.ts`
3. Create types in `types/index.ts`
4. Create validation schema in `lib/schemas.ts`
5. Compose using design system components

Example:

```typescript
// app/blog/page.tsx
import { getNavbarData, getFooterData, getBlogPage } from '@/lib/data/mock'
import { MainLayout } from '@/components/layout/MainLayout'

export default async function Blog() {
  const [navbar, footer, blog] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getBlogPage(), // New function
  ])
  
  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      {/* Compose page using components */}
    </MainLayout>
  )
}
```

## Customization

### Update Logo & Branding

Edit `lib/data/mock.ts`:

```typescript
export async function getNavbarData(): Promise<NavbarData> {
  return {
    logo: {
      text: 'Your Company',  // Change this
      href: '/',
    },
    // ...
  }
}
```

### Update Colors

Edit `app/globals.css` - the design tokens are at the top:

```css
:root {
  --primary: rgb(29 78 216);           /* Blue */
  --secondary: rgb(107 114 128);       /* Gray */
  --accent: rgb(59 130 246);           /* Light Blue */
  /* ... more colors */
}
```

### Change Typography

The font is configured in `app/layout.tsx`:

```typescript
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})
```

Change `DM_Sans` to any Google Font.

## API Routes

### Contact Form

**Endpoint**: `POST /api/contact`

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for your message..."
}
```

**Implementation**: Currently logs to console. Wire up your email service (Resend, SendGrid, etc.):

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  const validatedData = ContactDataSchema.parse(body)
  
  // TODO: Add your email service here
  // await sendEmail({
  //   to: validatedData.email,
  //   subject: validatedData.subject,
  //   body: validatedData.message,
  // })
  
  return Response.json({ success: true, message: '...' })
}
```

### Health Check

**Endpoint**: `GET /api/health`

Returns status for uptime monitoring/deployments.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Vercel automatically detects Next.js
3. All pages are static - no server needed

### Other Platforms

Since all pages are pre-rendered, you can deploy anywhere:

```bash
pnpm build
# Output is in .next/ directory
# Deploy the .next/ folder to any static host
```

## Migration to Sanity CMS

When you're ready to use Sanity:

1. **Create Sanity project** and define schemas matching your data types
2. **Create `lib/data/sanity.ts`** with Sanity queries
3. **Update `lib/cms/client.ts`** to use Sanity client
4. **Set environment variables**:
   ```
   NEXT_PUBLIC_CMS_PROVIDER=sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. **Redeploy** - No UI changes needed!

See `ARCHITECTURE.md` for detailed migration guide.

## Common Tasks

### Add a New Feature to Home Page

1. Add to mock data (`lib/data/mock.ts`)
2. Update type if needed (`types/index.ts`)
3. Create component if needed (`components/sections/`)
4. Compose in home page (`app/page.tsx`)

### Update Footer Links

```typescript
// lib/data/mock.ts
export async function getFooterData(): Promise<FooterData> {
  return {
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'New Link', href: '/new-page' },
          // ...
        ],
      },
      // ...
    ],
    // ...
  }
}
```

### Add Dark Mode Support

It's already included! Tailwind automatically handles light/dark mode with CSS variables defined in `globals.css`.

## Debugging

### Build Issues

```bash
pnpm build --verbose
```

### Type Errors

```bash
pnpm tsc --noEmit
```

### Runtime Errors

Check browser console and terminal output.

## Performance

All pages are pre-rendered as static HTML:

- Home: `○ (Static)`
- About: `○ (Static)`
- Services: `○ (Static)`
- Contact Form: `ƒ (Dynamic)` - server-rendered on demand
- API Routes: `ƒ (Dynamic)` - server-rendered on demand

This ensures blazing-fast performance.

## Support & Documentation

- **ARCHITECTURE.md** - Deep dive into the system architecture
- **DESIGN_SYSTEM.md** - Component library documentation
- **COMPONENT_REFERENCE.md** - Quick component lookup

## Next Steps

1. ✅ Review the current design system (`DESIGN_SYSTEM.md`)
2. ✅ Customize branding (logo, colors, copy)
3. ✅ Set up email service for contact form
4. ✅ Deploy to Vercel
5. ✅ Plan Sanity CMS integration (when ready)

## Questions?

Refer to the architecture documentation or check Next.js docs at https://nextjs.org
