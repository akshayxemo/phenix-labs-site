# SEO Implementation Guide

## Quick Start

All SEO improvements are already integrated into the project. No configuration changes are required to get started.

---

## Files Added for SEO

### Core SEO Files:
1. **`lib/seo.ts`** (189 lines)
   - Main SEO utilities
   - Metadata generation functions
   - JSON-LD schema generators
   - Site configuration

2. **`lib/accessibility.ts`** (54 lines)
   - ARIA labels
   - Accessibility constants
   - Screen reader utilities
   - Alt text generation

3. **`lib/images.ts`** (78 lines)
   - Image optimization utilities
   - Responsive image generation
   - Image metadata handling
   - Lazy loading configuration

4. **`types/seo.ts`** (92 lines)
   - TypeScript interfaces for SEO data
   - Schema type definitions
   - Structured data types

5. **`config/seo.ts`** (151 lines)
   - Centralized SEO configuration
   - Site metadata
   - Page-specific metadata
   - Company information

6. **`components/common/JsonLdSchema.tsx`** (20 lines)
   - Server component for rendering JSON-LD schemas
   - Hydration-safe schema rendering

### Documentation Files:
1. **`SEO_IMPROVEMENTS.md`** - Detailed improvements documentation
2. **`SEO_IMPLEMENTATION_GUIDE.md`** - This file

---

## Enhanced Components

### Updated Components:
1. **`components/sections/HeroSection.tsx`**
   - Added ARIA labels and roles
   - Semantic HTML improvements
   - Decorative elements marked with aria-hidden

2. **`components/sections/StatsSection.tsx`**
   - ARIA labels for statistics
   - Semantic HTML with `<article>`
   - Screen reader text for context

3. **`app/layout.tsx`**
   - Integrated SEO metadata generation
   - Added JSON-LD organization schema
   - Enhanced metadata verification

4. **`app/page.tsx`**
   - Using new `generateMetadata()` function
   - Comprehensive keywords
   - Page-specific description

---

## How to Use

### 1. Setting Metadata for New Pages

```typescript
// app/my-page/page.tsx
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'My Page Title',
  description: 'Page description goes here',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  path: '/my-page',
})

export default function MyPage() {
  return (
    // Your page content
  )
}
```

### 2. Adding JSON-LD Schemas

```typescript
import { JsonLdSchema } from '@/components/common/JsonLdSchema'
import { getWebPageSchema } from '@/lib/seo'

export default function MyPage() {
  return (
    <>
      <JsonLdSchema schema={getWebPageSchema({
        title: 'My Page',
        description: 'Description',
        path: '/my-page',
      })} />
      
      {/* Page content */}
    </>
  )
}
```

### 3. Adding ARIA Labels to Components

```typescript
<section
  aria-label="Description of section"
  role="region"
>
  <h2>Section Title</h2>
  <div aria-hidden="true">Decorative content</div>
</section>
```

### 4. Image Alt Text

```typescript
import { getImageAltText } from '@/lib/accessibility'

const altText = getImageAltText({
  title: 'Product Image',
  description: 'Shows product in use',
  context: 'Homepage hero section',
})

// Use in img tag
<img src="..." alt={altText} />
```

---

## Configuration

### Environment Variables

Add to `.env.local`:

```bash
# Required
NEXT_PUBLIC_BASE_URL=https://phenix-labs.com

# Optional
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

### Updating Site Configuration

Edit `config/seo.ts` to update:

1. **Company Information:**
```typescript
company: {
  name: 'Phenix Labs',
  email: 'hello@phenix-labs.com',
  phone: '+1-234-567-890',
  address: { /* ... */ },
}
```

2. **Social Media Links:**
```typescript
social: {
  twitter: '@phenixlabs',
  facebook: 'https://www.facebook.com/phenixlabs',
  linkedin: 'https://www.linkedin.com/company/phenixlabs',
  instagram: 'https://www.instagram.com/phenixlabs',
}
```

3. **Page Metadata:**
```typescript
pages: {
  home: {
    title: 'Custom Title',
    description: 'Custom description',
    path: '/',
  },
  // ... add more pages
}
```

---

## Search Engine Submission

### 1. Google Search Console
1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Enter your site URL
4. Verify ownership using provided methods
5. Submit sitemap at `/sitemap.xml`
6. Wait for crawling and indexing

### 2. Bing Webmaster Tools
1. Go to https://www.bing.com/webmaster
2. Sign in with Microsoft account
3. Add your site
4. Verify ownership
5. Submit sitemap

### 3. Yandex Webmaster (if targeting Russia)
1. Go to https://webmaster.yandex.com
2. Add your site
3. Verify ownership
4. Submit sitemap

---

## Testing & Verification

### 1. Metadata Validation

**Google Search Console:**
- Check "Coverage" for any errors
- Review "Enhancements" for rich results
- Check "Mobile Usability"

**Schema Validator:**
- Visit: https://schema.org/validator
- Copy your page's source HTML
- Paste and validate
- Fix any errors

### 2. Open Graph Testing

**Facebook Debugger:**
1. Go to: https://developers.facebook.com/tools/debug
2. Enter your page URL
3. Check preview rendering
4. Fix any warnings

**LinkedIn Post Inspector:**
1. Go to: https://www.linkedin.com/post-inspector
2. Enter your page URL
3. Verify preview

### 3. Twitter Card Testing

**Twitter Card Validator:**
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your page URL
3. Verify card type and content

### 4. Accessibility Testing

**WAVE Accessibility Tool:**
1. Install browser extension: https://wave.webaim.org/extension
2. Run on your pages
3. Fix any accessibility issues

**Lighthouse (Chrome DevTools):**
1. Right-click > Inspect
2. Go to Lighthouse tab
3. Run Accessibility audit
4. Review recommendations

### 5. Mobile-Friendly Test

**Google Mobile-Friendly Test:**
1. Go to: https://search.google.com/test/mobile-friendly
2. Enter your page URL
3. Check results
4. Fix any issues

---

## Performance Tips

### 1. Images
- Use WebP or AVIF formats
- Generate responsive image sets
- Add proper alt text
- Use lazy loading

### 2. Meta Content
- Keep titles under 60 characters
- Keep descriptions under 160 characters
- Use target keywords naturally
- Avoid keyword stuffing

### 3. Heading Hierarchy
- Use only one H1 per page
- Use H2 for main sections
- Use H3 for subsections
- Don't skip heading levels

### 4. Internal Linking
- Use descriptive anchor text
- Link to relevant pages
- Maintain logical site structure
- Avoid too many links per page

---

## Monitoring

### Tools to Track

1. **Google Analytics 4**
   - Set up to track user behavior
   - Monitor traffic sources
   - Track conversions

2. **Google Search Console**
   - Monitor indexing status
   - Check search queries
   - Fix crawl errors
   - Monitor Core Web Vitals

3. **Bing Webmaster Tools**
   - Monitor Bing indexing
   - Check crawl stats
   - Review keywords

4. **Ahrefs or SEMrush**
   - Track backlinks
   - Monitor competitors
   - Check keyword rankings

---

## Common SEO Tasks

### Add a New Page

1. Create the page file
2. Add metadata using `generateMetadata()`
3. Update `app/sitemap.ts` if needed
4. Update internal linking
5. Test with Lighthouse
6. Submit to Search Console

### Update Meta Tags

1. Edit the page's metadata
2. Build and deploy
3. Test with validators
4. Wait for search engines to crawl
5. Monitor in Search Console

### Add Schema Markup

1. Use appropriate schema type
2. Add `JsonLdSchema` component
3. Validate with schema validator
4. Test rich results in Search Console

### Improve Accessibility

1. Check with WAVE tool
2. Add ARIA labels where needed
3. Ensure proper heading hierarchy
4. Test with screen readers
5. Fix any identified issues

---

## Best Practices

### Content
- Write unique, descriptive titles
- Create compelling meta descriptions
- Use keywords naturally
- Provide value to users
- Update content regularly

### Technical
- Keep site fast and responsive
- Use clean, semantic HTML
- Implement proper redirects
- Fix broken links
- Use HTTPS everywhere

### Link Building
- Create high-quality content
- Encourage natural links
- Use proper anchor text
- Monitor backlinks
- Disavow spammy links

### User Experience
- Mobile-friendly design
- Fast page load times
- Easy navigation
- Clear call-to-actions
- Accessible to all users

---

## Troubleshooting

### Pages Not Indexing
1. Check robots.txt
2. Verify in Search Console
3. Request indexing manually
4. Check for noindex tags
5. Fix any crawl errors

### Low Rankings
1. Review keywords
2. Improve content quality
3. Build more backlinks
4. Check on-page optimization
5. Fix technical issues

### Poor Mobile Performance
1. Test with Mobile-Friendly Test
2. Check Core Web Vitals
3. Optimize images
4. Reduce JavaScript
5. Use caching

### Accessibility Issues
1. Run WAVE audit
2. Check heading hierarchy
3. Add ARIA labels
4. Test with screen readers
5. Fix color contrast issues

---

## Resources

### Learning
- https://developers.google.com/search/docs
- https://www.w3.org/WAI/ARIA/
- https://schema.org/
- https://developers.facebook.com/docs/sharing/webmasters

### Tools
- Google Search Console: https://search.google.com/search-console
- Google PageSpeed Insights: https://pagespeed.web.dev
- Schema Validator: https://schema.org/validator
- WAVE Accessibility: https://wave.webaim.org
- Lighthouse: Built into Chrome DevTools

### Checklist
Use this checklist to ensure all SEO elements are in place:

- [ ] Metadata on all pages
- [ ] Proper heading hierarchy
- [ ] ARIA labels on regions
- [ ] Alt text on images
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] JSON-LD schemas
- [ ] Robots.txt created
- [ ] Sitemap.xml created
- [ ] Mobile responsive design
- [ ] Fast page load times
- [ ] HTTPS enabled
- [ ] Accessibility audit passed
- [ ] Search Console set up
- [ ] Analytics configured

---

## Support

For questions about:
- **SEO Implementation:** Check `lib/seo.ts` and `config/seo.ts`
- **Accessibility:** Check `lib/accessibility.ts`
- **Images:** Check `lib/images.ts`
- **Types:** Check `types/seo.ts`
- **Schemas:** Check `components/common/JsonLdSchema.tsx`

All SEO components are production-ready and can be used immediately.
