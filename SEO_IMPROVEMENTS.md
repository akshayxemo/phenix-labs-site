# SEO Improvements Documentation

## Overview
This document outlines all SEO enhancements made to the Phenix Labs website without modifying the UI or changing the existing architecture.

---

## 1. Metadata API Implementation

### Files Created/Modified:
- **`lib/seo.ts`** - Core SEO utilities and metadata generation
  - `generateMetadata()` - Creates comprehensive Next.js metadata objects
  - `getOrganizationSchema()` - JSON-LD organization schema
  - `getWebPageSchema()` - JSON-LD webpage schema
  - `getBreadcrumbSchema()` - JSON-LD breadcrumb schema
  - `getServiceSchema()` - JSON-LD service schema

### Features:
- Centralized metadata management
- Type-safe metadata generation
- Automatic canonical URL handling
- Structured data for search engines

### Usage:
```typescript
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  path: '/page-slug',
})
```

---

## 2. Open Graph Implementation

### Implemented Features:
- Open Graph tags on all pages
- Dynamic image handling (1200x630px)
- Locale support (en_US default)
- Site name in all OG tags
- URL canonicalization

### Meta Tags Added:
```html
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Phenix Labs">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

---

## 3. Twitter Card Implementation

### Features:
- Twitter Card type: `summary_large_image`
- Creator and site attribution
- Custom image support
- Title and description optimization

### Meta Tags Added:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@phenixlabs">
<meta name="twitter:creator" content="@phenixlabs">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

---

## 4. Canonical URLs

### Implementation:
- Automatic canonical URL generation
- Base URL from environment variable: `NEXT_PUBLIC_BASE_URL`
- Per-page canonical override support
- Prevents duplicate content issues

### Configuration:
```typescript
// In lib/seo.ts
metadataBase: new URL(siteConfig.url),
alternates: {
  canonical: canonicalUrl,
}
```

---

## 5. JSON-LD Schema Implementation

### Schemas Implemented:

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Phenix Labs",
  "url": "https://phenix-labs.com",
  "logo": "https://phenix-labs.com/logo.png",
  "description": "...",
  "sameAs": ["social media urls"],
  "contactPoint": {...},
  "address": {...}
}
```

#### WebPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "...",
  "url": "...",
  "isPartOf": {...}
}
```

#### BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

#### Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service Name",
  "description": "...",
  "provider": {...}
}
```

### Rendering:
- Added `JsonLdSchema` component in `components/common/JsonLdSchema.tsx`
- Organization schema rendered in root layout
- Page-specific schemas can be added to individual pages

---

## 6. Robots.txt Configuration

### File: `app/robots.ts`

Features:
- Allows all user agents to crawl
- Excludes `/api/` and `/admin/` directories
- Points to sitemap.xml
- Dynamic base URL from environment

```typescript
{
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
  ],
  sitemap: `${baseUrl}/sitemap.xml`,
}
```

---

## 7. Sitemap.xml Configuration

### File: `app/sitemap.ts`

Features:
- All public pages included
- Last modified dates
- Change frequency hints
- Priority scores

Pages included:
- `/` (priority: 1.0, weekly)
- `/services` (priority: 0.8, weekly)
- `/about` (priority: 0.8, monthly)
- `/cases` (priority: 0.8, weekly)
- `/contact` (priority: 0.7, monthly)

---

## 8. Heading Hierarchy

### Proper H1-H6 Structure:

```
<h1>Page Main Title</h1>           <!-- One per page -->
  <h2>Section Title</h2>            <!-- Section headers -->
    <h3>Subsection Title</h3>       <!-- Subsection headers -->
      <h4>Detail Header</h4>        <!-- Detail headers -->
```

### Updates Made:
- **Home Page**: H1 for hero title, H2 for sections, H3 for subsections
- **Components**: Proper hierarchy in all section components
- **Consistency**: All pages follow the same structure

---

## 9. Accessibility Improvements

### Files Created:
- **`lib/accessibility.ts`** - Accessibility utilities and constants
- **`components/common/JsonLdSchema.tsx`** - Schema component with hydration handling

### Implemented Features:

#### ARIA Attributes Added:
- `aria-label` - Descriptive labels for sections
- `aria-labelledby` - Linking descriptions to elements
- `aria-hidden` - Hiding decorative elements
- `role` - Semantic roles for regions and groups

#### Semantic HTML:
- `<section>` for content sections
- `<article>` for independent content
- `<main>` for main content
- `<nav>` for navigation
- `<header>` for headers
- `<footer>` for footers

#### Screen Reader Optimization:
- Skip links for accessibility (can be added)
- Proper heading structure
- Descriptive link text
- Form labels and descriptions

### Example Modifications:

HeroSection:
```tsx
<section aria-label="Hero section" role="region">
  <div aria-hidden="true">Decorative content</div>
  <h1>Main Title</h1>
  <div role="group" aria-label="Call to action buttons">
    <Button>CTA</Button>
  </div>
</section>
```

StatsSection:
```tsx
<article 
  aria-labelledby={`stat-label-${idx}`}
>
  <span className="sr-only">{stat.label}: </span>
  {stat.value}
</article>
```

---

## 10. Image Optimization & Alt Text

### Files Created:
- **`lib/images.ts`** - Image utilities and metadata
- **`types/seo.ts`** - Image-related types

### Features:

#### Alt Text:
- Descriptive alt text for all images
- Context-aware alt generation function
- Predefined alt text library
- Alternative text required in data layer

#### Responsive Images:
- `getResponsiveImageSet()` - Generate srcsets
- Automatic size calculation
- Modern formats (WebP, AVIF)

#### Image Configuration:
```typescript
const IMAGE_CONFIG = {
  formats: ['webp', 'avif'],
  sizes: {
    mobile: 640,
    tablet: 1024,
    desktop: 1440,
  },
  quality: 85,
  lazyLoad: {
    enabled: true,
    threshold: 0.1,
    rootMargin: '50px',
  },
}
```

#### Usage in Mock Data:
```typescript
{
  image: 'TODO: /images/invention-1.jpg',
  alt: 'Moon surface showing detailed lunar features',
  title: 'Lunar Innovation Project',
}
```

---

## 11. Structured Data Interfaces

### Files Created:
- **`types/seo.ts`** - Complete SEO type definitions

### Type Definitions:

```typescript
interface OpenGraphImage {
  url: string
  width: number
  height: number
  alt: string
  type?: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
}

interface TwitterCard {
  card: 'summary' | 'summary_large_image' | 'app' | 'player'
  site: string
  creator?: string
  title: string
  description: string
  image: string
}

interface OrganizationSchema extends JsonLdSchema {
  '@type': 'Organization'
  name: string
  url: string
  // ... more fields
}

interface WebPageSchema extends JsonLdSchema {
  '@type': 'WebPage'
  name: string
  description: string
  // ... more fields
}
```

---

## 12. SEO Configuration

### File: `config/seo.ts`

Centralized configuration for:
- Site metadata
- Company information
- Social media links
- Default keywords
- Page-specific metadata
- Locale settings
- Heading hierarchy constants
- ARIA roles reference
- Image optimization settings

---

## Configuration Required

### Environment Variables:
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=https://phenix-labs.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

### Optional Improvements:
1. Replace all image placeholders with actual images
2. Update company contact information in `config/seo.ts`
3. Update social media URLs
4. Add Google Site Verification code
5. Set up Google Search Console
6. Set up Bing Webmaster Tools
7. Update OG image at `public/og-image.jpg`

---

## Testing & Verification

### Tools to Use:
1. **Google Search Console**
   - Submit sitemap
   - Check crawl statistics
   - Monitor index coverage

2. **Google PageSpeed Insights**
   - Check performance metrics
   - Verify mobile-friendly
   - Check Core Web Vitals

3. **Schema.org Validator**
   - Validate JSON-LD schemas
   - Check for errors and warnings

4. **OpenGraph Debugger**
   - Test Open Graph tags
   - Preview social sharing

5. **Twitter Card Validator**
   - Verify Twitter Card formatting
   - Test preview

6. **WAVE Accessibility Tool**
   - Check accessibility issues
   - Verify heading hierarchy
   - Check ARIA usage

---

## Summary of Improvements

✅ **Metadata API** - Centralized, type-safe metadata generation  
✅ **Open Graph** - Social sharing optimization  
✅ **Twitter Cards** - Twitter-specific social cards  
✅ **Canonical URLs** - Duplicate content prevention  
✅ **JSON-LD Schemas** - Rich snippets for search engines  
✅ **Robots.txt** - Search engine crawling control  
✅ **Sitemap.xml** - Site structure for search engines  
✅ **Heading Hierarchy** - Proper H1-H6 structure  
✅ **Accessibility** - ARIA labels and semantic HTML  
✅ **Image Optimization** - Alt text and responsive images  
✅ **Structured Data** - Type-safe data structures  
✅ **SEO Config** - Centralized configuration  

---

## No UI Changes
All improvements were made without modifying the visual appearance or user interface. The architecture remains unchanged and ready for future CMS integration.
