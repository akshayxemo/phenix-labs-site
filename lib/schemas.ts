/**
 * Zod schemas for runtime validation
 * Ensures data conforms to expected types
 */

import { z } from 'zod'

export const NavLinkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
  isActive: z.boolean().optional(),
  showInFooter: z.boolean().optional(),
})

export const NavbarDataSchema = z.object({
  logo: z.object({
    text: z.string(),
    href: z.string().url(),
  }),
  links: z.array(NavLinkSchema),
  contactCta: z.object({
    text: z.string(),
    href: z.string(),
  }).optional(),
  cta: z.object({
    text: z.string(),
    href: z.string().url(),
  }).optional(),
})

export const FooterDataSchema = z.object({
  copyright: z.string(),
})

export const HeroContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  cta: z.object({
    text: z.string(),
    href: z.string().url(),
  }),
  backgroundImage: z.string().optional(),
})

export const FeatureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  image: z.string().optional(),
})

export const StatSchema = z.object({
  label: z.string(),
  value: z.string(),
  suffix: z.string().optional(),
})

export const ServiceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  features: z.array(z.string()).optional(),
  image: z.string().optional(),
})

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string(),
  social: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
  }).optional(),
})

export const ProjectCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  link: z.string().optional(),
  featured: z.boolean().optional(),
})

export const ContactDataSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})
