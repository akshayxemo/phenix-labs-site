# Phenix Labs - Design System

A comprehensive, production-ready design system for premium corporate websites.

## Table of Contents

- [Getting Started](#getting-started)
- [Design Tokens](#design-tokens)
- [Typography](#typography)
- [Layout Components](#layout-components)
- [Card Components](#card-components)
- [Form Components](#form-components)
- [Navigation Components](#navigation-components)
- [Common Components](#common-components)
- [Animation Components](#animation-components)
- [Feedback Components](#feedback-components)
- [Best Practices](#best-practices)

## Getting Started

All components are built with:
- **Next.js 16** - App Router with Server Components as default
- **TypeScript** - Strict typing throughout
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Subtle animations
- **DM Sans** - Corporate font via `next/font/google`

### Import Components

```typescript
import { Button, Card, Container, Section } from '@/components'
```

## Design Tokens

### Colors

All colors use CSS variables and semantic naming:

- **Primary**: Main brand color for interactive elements
- **Secondary**: Supporting color for secondary actions
- **Accent**: Highlight color for emphasis
- **Muted**: Disabled or secondary text
- **Success/Warning/Destructive**: Status colors
- **Background/Foreground**: Base colors for text and backgrounds

```css
/* Light Mode */
--primary: rgb(29 78 216);
--accent: rgb(59 130 246);
--background: rgb(255 255 255);

/* Dark Mode (automatic) */
--primary: rgb(147 197 253);
--background: rgb(10 10 10);
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-hover: 0 20px 25px -5px rgb(0 0 0 / 0.15);
--shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.08);
```

### Border Radius

```css
--radius-sm: 0.375rem;    /* 6px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 0.75rem;     /* 12px */
--radius-xl: 1rem;        /* 16px */
--radius-full: 9999px;    /* Full border radius */
```

### Spacing

Uses standard spacing scale in pixels:
`2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

## Typography

### Predefined Text Classes

```tsx
/* Display XL - 3rem / 48px - Bold - Large headings */
<h1 className="text-display-xl">Hero Title</h1>

/* Display - 2.25rem / 36px - Bold - Page headers */
<h2 className="text-display">Section Title</h2>

/* H1 - 1.875rem / 30px - Bold - Main headings */
<h1 className="text-h1">Main Heading</h1>

/* H2 - 1.5rem / 24px - Bold - Section headers */
<h2 className="text-h2">Section Heading</h2>

/* H3 - 1.125rem / 18px - Semibold - Subsections */
<h3 className="text-h3">Subsection</h3>

/* H4 - 1.125rem / 18px - Semibold - Small headings */
<h4 className="text-h4">Small Heading</h4>

/* Body Large - 1.125rem / 18px - Regular - Large body text */
<p className="text-body-large">Large paragraph</p>

/* Body - 1rem / 16px - Regular - Default body text */
<p className="text-body">Normal paragraph</p>

/* Small - 0.875rem / 14px - Regular - Small text */
<p className="text-small">Small text</p>

/* Caption - 0.75rem / 12px - Regular - Captions */
<p className="text-caption">Caption text</p>

/* Label - 0.875rem / 14px - Medium, Uppercase - Form labels */
<p className="text-label">LABEL TEXT</p>
```

## Layout Components

### Container

Constrains content width with responsive padding.

```tsx
import { Container } from '@/components'

<Container size="lg">
  <p>Content</p>
</Container>

// Sizes: 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'xl')
```

### Section

Semantic section wrapper with background variants.

```tsx
import { Section } from '@/components'

<Section variant="alternate" padding="lg">
  <Container>
    <SectionHeader title="Our Services" />
  </Container>
</Section>

// Variants: 'default' | 'alternate' | 'dark'
// Padding: 'sm' | 'md' | 'lg' | 'xl'
```

### Stack

Flexible row/column layout with gap management.

```tsx
import { Stack } from '@/components'

<Stack direction="col" gap="md" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// Direction: 'row' | 'col'
// Gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
// Align: 'start' | 'center' | 'end' | 'stretch'
```

### Grid

Responsive multi-column grid layout.

```tsx
import { Grid } from '@/components'

<Grid cols={3} gap="lg" responsive>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Cols: 1 | 2 | 3 | 4 | 6
// Responsive automatically adjusts on sm/md/lg
```

### SectionHeader

Semantic header with title, subtitle, and description.

```tsx
import { SectionHeader } from '@/components'

<SectionHeader
  subtitle="Our Capabilities"
  title="World-Class Engineering"
  description="We build scalable solutions for the modern web."
  align="center"
/>
```

## Card Components

### Card

Base card component with customizable shadows and borders.

```tsx
import { Card } from '@/components'

<Card padding="lg" shadow="hover" border hover>
  <p>Card content</p>
</Card>

// Padding: 'sm' | 'md' | 'lg'
// Shadow: 'sm' | 'md' | 'lg' | 'hover'
// Border: boolean (default: true)
// Hover: boolean (default: false)
```

### FeatureCard

Card for features with icon and description.

```tsx
import { FeatureCard } from '@/components'
import { CheckIcon } from 'lucide-react'

<FeatureCard
  icon={<CheckIcon />}
  title="Fast"
  description="Lightning quick performance"
  accentColor="primary"
/>
```

### StatCard

Card for displaying metrics and statistics.

```tsx
import { StatCard } from '@/components'

<StatCard
  label="Total Users"
  value="10K+"
  description="Active monthly users"
/>
```

## Form Components

### Input

Standard text input with label and validation.

```tsx
import { Input } from '@/components'

<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  error={emailError}
  helperText="We'll never share your email"
/>
```

### Textarea

Multi-line text input with validation.

```tsx
import { Textarea } from '@/components'

<Textarea
  label="Message"
  placeholder="Enter your message..."
  error={messageError}
/>
```

### Checkbox

Checkbox input with label.

```tsx
import { Checkbox } from '@/components'

<Checkbox
  id="terms"
  label="I agree to the terms"
  error={termsError}
/>
```

## Navigation Components

### NavigationLink

Link component with active state styling.

```tsx
import { NavigationLink } from '@/components'

<NavigationLink href="/about" active={isActive}>
  About Us
</NavigationLink>
```

### Footer

Multi-column footer with links and copyright.

```tsx
import { Footer } from '@/components'

<Footer
  columns={[
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
  ]}
  copyrightText="© 2024 Phenix Labs"
/>
```

## Common Components

### Badge

Label badges for tags and status.

```tsx
import { Badge } from '@/components'

<Badge variant="primary" size="md">
  Featured
</Badge>

// Variants: 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
// Size: 'sm' | 'md'
```

### Logo

Branded logo component.

```tsx
import { Logo } from '@/components'

<Logo variant="default" size="md" />

// Variant: 'default' | 'dark' | 'light'
// Size: 'sm' | 'md' | 'lg'
```

### Divider

Visual separator line.

```tsx
import { Divider } from '@/components'

<Divider variant="default" orientation="horizontal" />

// Variant: 'default' | 'subtle'
// Orientation: 'horizontal' | 'vertical'
```

### Spacer

Whitespace component for layout control.

```tsx
import { Spacer } from '@/components'

<Spacer size="md" axis="y" />

// Size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
// Axis: 'x' | 'y'
```

## Animation Components

### FadeUp

Fade in and slide up animation.

```tsx
import { FadeUp } from '@/components'

<FadeUp delay={0.2} duration={0.5}>
  <h2>Animated heading</h2>
</FadeUp>
```

### ScaleIn

Scale and fade in animation.

```tsx
import { ScaleIn } from '@/components'

<ScaleIn delay={0.1}>
  <Card>Animated card</Card>
</ScaleIn>
```

## Feedback Components

### LoadingSkeleton

Placeholder skeleton for loading states.

```tsx
import { LoadingSkeleton } from '@/components'

<LoadingSkeleton variant="card" count={3} />

// Variant: 'text' | 'card' | 'image'
```

### EmptyState

Empty state display for no data.

```tsx
import { EmptyState } from '@/components'

<EmptyState
  icon="📭"
  title="No items found"
  description="Create your first item to get started"
  action={<Button>Create Item</Button>}
/>
```

## Section Components

### HeroSection

Full-width hero banner section.

```tsx
import { HeroSection } from '@/components'

<HeroSection
  subtitle="Welcome"
  title="Engineering Excellence"
  description="Building the future, one project at a time"
  background="gradient"
>
  <Button>Get Started</Button>
</HeroSection>

// Background: 'default' | 'gradient' | 'accent'
```

## Best Practices

### 1. Use Server Components by Default

Always use Server Components unless interactivity is needed. Only add `'use client'` when necessary.

```tsx
// ✅ Good - Server Component
export function ProductList() {
  const products = await getProducts()
  return <div>{/* render products */}</div>
}

// ❌ Avoid - Unnecessary client component
'use client'
export function ProductList() {
  // ...
}
```

### 2. Compose Components

Build pages by composing smaller components rather than creating monolithic pages.

```tsx
// ✅ Good - Composition
export function HomePage() {
  return (
    <>
      <HeroSection />
      <Container>
        <FeaturesGrid />
      </Container>
      <Footer />
    </>
  )
}

// ❌ Avoid - All in one page
export function HomePage() {
  return <div>{/* 500 lines of code */}</div>
}
```

### 3. Separation of Concerns

Keep data fetching, business logic, and UI rendering separate.

```tsx
// ✅ Good - Separate concerns
function FeaturesList({ features }: { features: Feature[] }) {
  return (
    <Grid cols={3}>
      {features.map((f) => (
        <FeatureCard key={f.id} {...f} />
      ))}
    </Grid>
  )
}

export async function FeaturesSection() {
  const features = await getFeatures()
  return (
    <Section>
      <Container>
        <SectionHeader title="Features" />
        <FeaturesList features={features} />
      </Container>
    </Section>
  )
}
```

### 4. Type Safety

Always use TypeScript types for props.

```tsx
// ✅ Good - Typed props
interface CardProps {
  title: string
  description: string
  icon?: ReactNode
}

export function MyCard({ title, description, icon }: CardProps) {
  return <Card>{/* ... */}</Card>
}

// ❌ Avoid - No types
export function MyCard(props: any) {
  // ...
}
```

### 5. Semantic Spacing

Use Tailwind spacing utilities instead of arbitrary values.

```tsx
// ✅ Good
<div className="space-y-4 p-6 mb-8">
  {/* content */}
</div>

// ❌ Avoid
<div className="space-y-[16px] p-[24px] mb-[32px]">
  {/* content */}
</div>
```

### 6. Color Variables

Always use semantic color tokens, never hardcoded colors.

```tsx
// ✅ Good
<div className="bg-primary text-primary-foreground">
  {/* content */}
</div>

// ❌ Avoid
<div className="bg-blue-600 text-white">
  {/* content */}
</div>
```

### 7. Dark Mode Support

Design with dark mode in mind from the start.

```tsx
// ✅ Good - Works in both modes
<div className="bg-background text-foreground border border-border">
  {/* content */}
</div>

// ❌ Avoid - Light mode only
<div className="bg-white text-black border border-gray-200">
  {/* content */}
</div>
```

### 8. Accessibility

Include ARIA labels and semantic HTML.

```tsx
// ✅ Good - Accessible
<button
  aria-label="Close dialog"
  onClick={handleClose}
  className="text-muted-foreground hover:text-foreground"
>
  <XIcon />
</button>

// ❌ Avoid - Not accessible
<div onClick={handleClose} className="cursor-pointer">
  ×
</div>
```

## Architecture Overview

```
components/
├── layout/              # Layout structure
│   ├── Container.tsx
│   ├── Section.tsx
│   ├── SectionHeader.tsx
│   ├── Stack.tsx
│   └── Grid.tsx
├── cards/               # Card variants
│   ├── Card.tsx
│   ├── FeatureCard.tsx
│   └── StatCard.tsx
├── forms/               # Form inputs
│   ├── Input.tsx
│   ├── Textarea.tsx
│   └── Checkbox.tsx
├── navigation/          # Navigation components
│   ├── NavigationLink.tsx
│   └── Footer.tsx
├── common/              # Common utilities
│   ├── Badge.tsx
│   ├── Divider.tsx
│   ├── Spacer.tsx
│   ├── Logo.tsx
│   └── ImageWrapper.tsx
├── animations/          # Motion components
│   ├── FadeUp.tsx
│   └── ScaleIn.tsx
├── feedback/            # Feedback UI
│   ├── LoadingSkeleton.tsx
│   └── EmptyState.tsx
├── sections/            # Page sections
│   └── HeroSection.tsx
└── index.ts            # Barrel exports

lib/
├── utils.ts            # Utility functions
├── animations.ts       # Animation variants
├── types.ts           # TypeScript types
└── cn.ts              # Class name utilities
```

---

Built with ❤️ for modern, scalable web applications.
