# Component Reference - Quick Guide

Fast lookup for all available components and their usage.

## Layout Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `Container` | Content width constraint | `size`: sm\|md\|lg\|xl\|2xl |
| `Section` | Page sections with backgrounds | `variant`, `padding` |
| `Stack` | Flexbox layout | `direction`, `gap`, `align`, `justify` |
| `Grid` | Multi-column layout | `cols`, `gap`, `responsive` |
| `SectionHeader` | Section title + description | `title`, `subtitle`, `description`, `align` |

## Card Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `Card` | Base card container | `padding`, `shadow`, `border`, `hover` |
| `FeatureCard` | Feature with icon | `icon`, `title`, `description`, `accentColor` |
| `StatCard` | Metric display | `label`, `value`, `description` |

## Form Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `Input` | Text input field | `label`, `type`, `error`, `helperText` |
| `Textarea` | Multi-line input | `label`, `error`, `helperText` |
| `Checkbox` | Checkbox input | `label`, `error` |

## Navigation Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `NavigationLink` | Nav link with active state | `href`, `active` |
| `Footer` | Multi-column footer | `columns`, `copyrightText` |

## Common Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `Badge` | Status/tag badge | `variant`, `size` |
| `Divider` | Visual separator | `variant`, `orientation` |
| `Spacer` | Whitespace | `size`, `axis` |
| `Logo` | Brand logo | `variant`, `size` |
| `ImageWrapper` | Next.js Image wrapper | `src`, `alt`, `fallback` |

## Animation Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| `FadeUp` | Fade in + slide up | Wrap content to animate on scroll |
| `ScaleIn` | Scale + fade in | Wrap content to animate on scroll |

## Feedback Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `LoadingSkeleton` | Loading placeholder | `variant`, `count` |
| `EmptyState` | No data display | `icon`, `title`, `description`, `action` |

## Section Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `HeroSection` | Full-width hero banner | `title`, `subtitle`, `description`, `background` |

## Color Tokens

Use these CSS variables in your components:

```
--primary              --primary-foreground
--secondary            --secondary-foreground
--accent               --accent-foreground
--background           --foreground
--card                 --card-foreground
--border               --input
--muted                --muted-foreground
--destructive          --success
--warning              --info
--surface              --surface-variant
--footer               --hero-background
--section-background
```

## Typography Classes

```
.text-display-xl    /* 3rem - Hero titles */
.text-display       /* 2.25rem - Page headers */
.text-h1            /* 1.875rem - Main headings */
.text-h2            /* 1.5rem - Section headers */
.text-h3            /* 1.125rem - Subsections */
.text-h4            /* 1.125rem - Small headings */
.text-body-large    /* 1.125rem - Large text */
.text-body          /* 1rem - Body text */
.text-small         /* 0.875rem - Small text */
.text-caption       /* 0.75rem - Captions */
.text-label         /* 0.875rem - Form labels */
```

## Shadow Classes

```
shadow-sm        /* 0 1px 2px */
shadow-md        /* 0 4px 6px */
shadow-lg        /* 0 10px 15px */
shadow-xl        /* 0 20px 25px */
shadow-hover     /* 0 20px 25px (hover effect) */
shadow-card      /* Subtle card shadow */
shadow-modal     /* Deep modal shadow */
```

## Spacing Utilities

Standard Tailwind spacing: `p-4`, `m-6`, `gap-8`, etc.

Semantic spacing values:
- `xs`: 0.5rem / 8px
- `sm`: 1rem / 16px
- `md`: 1.5rem / 24px
- `lg`: 2rem / 32px
- `xl`: 3rem / 48px

## Animation Classes

```
.animate-fade-up      /* Fade in + slide up */
.animate-fade-in      /* Fade in only */
.animate-slide-left   /* Slide left + fade */
.animate-slide-right  /* Slide right + fade */
.animate-scale        /* Scale + fade */
```

## Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Use with Tailwind: `sm:text-lg`, `md:grid-cols-2`, `lg:p-8`

## Common Patterns

### Section with Container
```tsx
<Section>
  <Container>
    {/* content */}
  </Container>
</Section>
```

### Feature Grid
```tsx
<Grid cols={3} gap="lg">
  <FeatureCard icon={<Icon />} title="Feature" description="..." />
  <FeatureCard icon={<Icon />} title="Feature" description="..." />
  <FeatureCard icon={<Icon />} title="Feature" description="..." />
</Grid>
```

### Form
```tsx
<form className="space-y-6">
  <Input label="Email" type="email" />
  <Textarea label="Message" />
  <Checkbox label="Agree to terms" />
  <Button>Submit</Button>
</form>
```

### Animated Card Grid
```tsx
<Grid cols={3}>
  {items.map((item, i) => (
    <FadeUp key={item.id} delay={i * 0.1}>
      <Card hover>
        {/* content */}
      </Card>
    </FadeUp>
  ))}
</Grid>
```

### Empty State
```tsx
{items.length === 0 ? (
  <EmptyState
    title="No items"
    description="Create your first item"
    action={<Button>Create</Button>}
  />
) : (
  <ItemsList items={items} />
)}
```

### Hero + Section
```tsx
<HeroSection
  title="Welcome"
  description="Start building"
>
  <Button>Get Started</Button>
</HeroSection>

<Section>
  <Container>
    <SectionHeader title="Features" />
    {/* content */}
  </Container>
</Section>
```

## File Organization

Every page should follow this pattern:

```tsx
// pages/example.tsx

// 1. Imports
import { Container, Section, SectionHeader, Grid, FeatureCard } from '@/components'

// 2. Component (if small)
// or import from separate file

// 3. Server-side data fetching
async function getExampleData() {
  const data = await fetch('...')
  return data
}

// 4. Page component
export default async function ExamplePage() {
  const data = await getExampleData()

  return (
    <>
      <HeroSection title="Example" />
      <Section>
        <Container>
          <SectionHeader title="Our Work" />
          <Grid cols={3}>
            {data.map(item => (
              <FeatureCard key={item.id} {...item} />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
```

---

For more details, see `DESIGN_SYSTEM.md`
