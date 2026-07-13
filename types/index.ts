/**
 * Core type definitions for the website
 * All data structures are defined here for type safety
 */

export interface NavLink {
  label: string
  href: string
  isActive?: boolean
}

export interface NavbarData {
  logo: {
    text: string
    href: string
  }
  links: NavLink[]
  cta?: {
    text: string
    href: string
  }
}

export interface FooterLink {
  text: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  icon: string
  href: string
  label: string
}

export interface FooterData {
  columns: FooterColumn[]
  social: SocialLink[]
  copyright: string
  newsletter?: {
    title: string
    description: string
    placeholder: string
  }
}

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  cta: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon?: string
  image?: string
}

export interface Stat {
  label: string
  value: string
  suffix?: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon?: string
  features?: string[]
  image?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface ProjectCase {
  id: string
  title: string
  description: string
  category: string
  image: string
  link?: string
  featured?: boolean
}

export interface PageContent {
  title: string
  description: string
  keywords: string[]
}

export interface HomePage extends PageContent {
  hero: HeroContent
  stats: Stat[]
  whatWeDo: {
    title: string
    description: string
    services: Array<{
      id: string
      title: string
      description: string
      icon: string
    }>
  }
  ourServices: {
    title: string
    description: string
    services: Array<{
      id: string
      title: string
      description: string
      icon: string
    }>
  }
  ourInventions: {
    title: string
    description: string
    inventions: Array<{
      id: string
      title: string
      description: string
      image: string
      bgColor: string
    }>
  }
  testimonials: {
    title: string
    description: string
    testimonials: Array<{
      id: string
      quote: string
      author: string
      role: string
      rating: number
    }>
  }
  cta: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export interface ServicesPage extends PageContent {
  hero: HeroContent
  services: ServiceItem[]
  process?: {
    title: string
    steps: {
      number: number
      title: string
      description: string
    }[]
  }
}

export interface AboutPage extends PageContent {
  hero: HeroContent
  mission: {
    title: string
    description: string
  }
  values: {
    title: string
    items: {
      title: string
      description: string
    }[]
  }
  team?: TeamMember[]
  stats: Stat[]
}

export interface CasesPage extends PageContent {
  hero: HeroContent
  cases: ProjectCase[]
}

export interface ContactData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}
