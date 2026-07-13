# Phenix Labs

Premium, production-ready design system and component library for corporate websites.

## 🚀 Quick Start

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

## 📚 Documentation

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Comprehensive design system documentation
- **[COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)** - Quick component lookup
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Setup details and next steps

## 🎨 What's Included

### 45+ Production-Ready Components
- Layout (Container, Section, Stack, Grid, SectionHeader)
- Cards (Card, FeatureCard, StatCard)
- Forms (Input, Textarea, Checkbox)
- Navigation (NavigationLink, Footer)
- Common (Badge, Divider, Spacer, Logo, ImageWrapper)
- Animations (FadeUp, ScaleIn)
- Feedback (LoadingSkeleton, EmptyState)
- Sections (HeroSection)

### Comprehensive Design System
- Semantic color tokens with dark mode
- Typography scale (Display XL → Caption)
- Spacing system
- Shadow system
- Border radius tokens
- Animation utilities
- Responsive breakpoints

### Modern Tech Stack
- Next.js 16 with React 19
- TypeScript (Strict)
- Tailwind CSS v4
- Framer Motion
- Lucide React icons
- DM Sans font (from next/font/google)

## 📖 Basic Usage

```tsx
import {
  HeroSection,
  Container,
  Section,
  SectionHeader,
  Grid,
  FeatureCard,
  Footer,
} from '@/components'

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Welcome to Phenix Labs"
        description="Engineering excellence"
      >
        <Button>Get Started</Button>
      </HeroSection>

      <Section>
        <Container>
          <SectionHeader title="Our Features" />
          <Grid cols={3}>
            <FeatureCard
              title="Fast"
              description="Lightning quick"
            />
            <FeatureCard
              title="Secure"
              description="Enterprise grade"
            />
            <FeatureCard
              title="Scalable"
              description="Grows with you"
            />
          </Grid>
        </Container>
      </Section>

      <Footer columns={[...]} />
    </>
  )
}
```

## 🎯 Key Features

✅ **Server Components First** - Minimal client JavaScript  
✅ **Type Safe** - Strict TypeScript throughout  
✅ **Dark Mode** - Full light/dark theme support  
✅ **Accessible** - ARIA labels, semantic HTML  
✅ **Responsive** - Mobile-first design  
✅ **Optimized** - Next.js Image, code splitting  
✅ **Composable** - Build with reusable components  
✅ **Semantic Tokens** - Easy customization  

## 🛠️ Customization

### Change Brand Color
Edit `app/globals.css`:
```css
:root {
  --primary: rgb(YOUR_BRAND_COLOR);
}
```

### Add New Components
1. Create component in appropriate folder
2. Export from `components/index.ts`
3. Update documentation

### Modify Typography
Edit typography classes in `app/globals.css`

## 📁 Project Structure

```
components/
├── layout/       # Layout structure
├── cards/        # Card variants
├── forms/        # Form inputs
├── navigation/   # Navigation
├── common/       # Common utilities
├── animations/   # Motion
├── feedback/     # Feedback UI
├── sections/     # Page sections
└── index.ts      # Exports

lib/
├── utils.ts      # Utilities
├── animations.ts # Animation variants
└── types.ts      # TypeScript types

app/
├── layout.tsx    # Root layout
├── globals.css   # Design tokens
└── page.tsx      # Home page
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Self-Hosted
```bash
pnpm build
pnpm start
```

## 📝 Development Guidelines

### Always Use Server Components
```tsx
// ✅ Good
export default function Page() {
  const data = await fetch(...)
  return <Component data={data} />
}

// ❌ Avoid
'use client'
export default function Page() {
  const [data, setData] = useState(...)
}
```

### Compose Components
```tsx
// ✅ Good - Reusable pieces
<HeroSection />
<Section><Container><Grid /></Container></Section>
<Footer />

// ❌ Avoid - One big component
<div className="...">Everything</div>
```

### Use Semantic Colors
```tsx
// ✅ Good
<button className="bg-primary text-primary-foreground" />

// ❌ Avoid
<button className="bg-blue-600 text-white" />
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 🤝 Component Development

When creating new components:

1. **Use TypeScript** - Full type safety
2. **Add Props Interface** - Document parameters
3. **Include JSDoc** - Add comments
4. **Server Component Default** - Only use 'use client' when needed
5. **Follow Naming** - Semantic component names
6. **Export from index.ts** - For easy imports
7. **Update Documentation** - Add to guides

Example:
```tsx
/**
 * MyComponent - Does something
 * @param title - Component title
 * @param variant - Style variant
 */
interface MyComponentProps {
  title: string
  variant?: 'default' | 'primary'
}

export function MyComponent({
  title,
  variant = 'default',
}: MyComponentProps) {
  return <div>{title}</div>
}
```

## 📞 Support

For detailed documentation:
- See `DESIGN_SYSTEM.md` for comprehensive guide
- See `COMPONENT_REFERENCE.md` for quick lookup
- Check `SETUP_COMPLETE.md` for setup details

## 📜 License

This design system is built for Phenix Labs.

---

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS.
