/**
 * Mock data functions - Replace with Sanity queries later
 * These maintain the same async interface for seamless migration
 */

import type {
  NavbarData,
  FooterData,
  HomePage,
  ServicesPage,
  AboutPage,
  CasesPage,
} from '@/types'

// Simulate async data fetching
const delay = () => new Promise(resolve => setTimeout(resolve, 100))

export async function getNavbarData(): Promise<NavbarData> {
  await delay()
  
  return {
    logo: {
      text: 'Phenix Labs',
      href: '/',
    },
    links: [
      { label: 'Home', href: '/', isActive: true },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Cases', href: '/cases' },
    ],
    cta: {
      text: 'Get Started',
      href: '/contact',
    },
  }
}

export async function getFooterData(): Promise<FooterData> {
  await delay()
  
  return {
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '#features' },
          { text: 'Security', href: '#security' },
          { text: 'Pricing', href: '#pricing' },
          { text: 'Roadmap', href: '#roadmap' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About', href: '/about' },
          { text: 'Blog', href: '/blog' },
          { text: 'Careers', href: '/careers' },
          { text: 'Press', href: '/press' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { text: 'Documentation', href: '#docs' },
          { text: 'API Reference', href: '#api' },
          { text: 'Contact', href: '/contact' },
          { text: 'Support', href: '#support' },
        ],
      },
    ],
    social: [
      { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
      { icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
      { icon: 'github', href: 'https://github.com', label: 'GitHub' },
    ],
    copyright: '© 2026 Phenix Labs. All rights reserved.',
    newsletter: {
      title: 'Stay Updated',
      description: 'Subscribe to our newsletter for latest updates',
      placeholder: 'Enter your email',
    },
  }
}

export async function getHomePage(): Promise<HomePage> {
  await delay()
  
  return {
    title: 'Phenix Labs - Premium Engineering Solutions',
    description: 'Premium engineering company delivering innovative technology solutions',
    keywords: ['engineering', 'technology', 'innovation', 'solutions'],
    hero: {
      title: 'Engineering Excellence Redefined',
      subtitle: 'Premium solutions for ambitious teams',
      description:
        'We deliver cutting-edge technology and strategic engineering expertise to drive your business forward.',
      cta: {
        text: 'Explore Our Services',
        href: '/services',
      },
    },
    features: [
      {
        id: '1',
        title: 'Strategic Planning',
        description: 'We align technology with your business goals',
        icon: 'target',
      },
      {
        id: '2',
        title: 'Expert Execution',
        description: 'Proven methodologies and best practices',
        icon: 'zap',
      },
      {
        id: '3',
        title: 'Continuous Support',
        description: 'Dedicated teams committed to your success',
        icon: 'users',
      },
    ],
    stats: [
      { label: 'Years Experience', value: '15+' },
      { label: 'Successful Projects', value: '500+' },
      { label: 'Team Members', value: '120+' },
      { label: 'Client Satisfaction', value: '98%' },
    ],
    services: [
      {
        id: 'service-1',
        title: 'Cloud Architecture',
        description: 'Design and implement scalable cloud solutions',
        features: ['AWS', 'GCP', 'Azure'],
      },
      {
        id: 'service-2',
        title: 'Full-Stack Development',
        description: 'End-to-end application development services',
        features: ['Frontend', 'Backend', 'DevOps'],
      },
      {
        id: 'service-3',
        title: 'AI & Machine Learning',
        description: 'Advanced AI solutions for modern challenges',
        features: ['ML Models', 'Data Science', 'Analytics'],
      },
    ],
    cta: {
      title: 'Ready to Transform Your Business?',
      description: 'Let\'s work together to achieve your goals',
      buttonText: 'Start Your Project',
      buttonLink: '/contact',
    },
  }
}

export async function getServicesPage(): Promise<ServicesPage> {
  await delay()
  
  return {
    title: 'Our Services - Phenix Labs',
    description: 'Comprehensive engineering and technology services',
    keywords: ['services', 'engineering', 'technology', 'development'],
    hero: {
      title: 'Our Services',
      subtitle: 'Comprehensive Solutions Tailored to Your Needs',
      description: 'From strategy to execution, we provide end-to-end engineering excellence.',
      cta: {
        text: 'Get Started',
        href: '/contact',
      },
    },
    services: [
      {
        id: 'service-1',
        title: 'Web Development',
        description: 'Modern, scalable web applications built with latest technologies',
        features: [
          'React & Next.js',
          'TypeScript',
          'API Integration',
          'Performance Optimization',
        ],
      },
      {
        id: 'service-2',
        title: 'Mobile Development',
        description: 'Native and cross-platform mobile applications',
        features: ['iOS', 'Android', 'React Native', 'Cross-platform'],
      },
      {
        id: 'service-3',
        title: 'Cloud Infrastructure',
        description: 'Secure, scalable cloud infrastructure design and management',
        features: ['DevOps', 'Kubernetes', 'CI/CD', 'Security'],
      },
      {
        id: 'service-4',
        title: 'Data & Analytics',
        description: 'Transform your data into actionable insights',
        features: ['Data Warehousing', 'BI Tools', 'Analytics', 'ML Models'],
      },
    ],
    process: {
      title: 'Our Process',
      steps: [
        {
          number: 1,
          title: 'Discovery',
          description: 'Understanding your goals and challenges',
        },
        {
          number: 2,
          title: 'Planning',
          description: 'Developing comprehensive technical strategy',
        },
        {
          number: 3,
          title: 'Execution',
          description: 'Agile development with regular updates',
        },
        {
          number: 4,
          title: 'Deployment',
          description: 'Smooth launch and continuous optimization',
        },
      ],
    },
  }
}

export async function getAboutPage(): Promise<AboutPage> {
  await delay()
  
  return {
    title: 'About Phenix Labs',
    description: 'Learn about our company, mission, and values',
    keywords: ['about', 'company', 'team', 'mission'],
    hero: {
      title: 'About Phenix Labs',
      subtitle: 'Leading Innovation in Engineering',
      description: 'Established in 2009, we\'ve been pioneering engineering excellence.',
      cta: {
        text: 'Join Our Team',
        href: '/careers',
      },
    },
    mission: {
      title: 'Our Mission',
      description:
        'To empower businesses through innovative engineering solutions and strategic technology partnerships that drive sustainable growth and competitive advantage.',
    },
    values: {
      title: 'Our Values',
      items: [
        {
          title: 'Excellence',
          description: 'We strive for the highest quality in everything we do',
        },
        {
          title: 'Innovation',
          description: 'Continuously exploring new technologies and approaches',
        },
        {
          title: 'Integrity',
          description: 'Operating with honesty and transparency in all relationships',
        },
        {
          title: 'Collaboration',
          description: 'Working together to achieve shared goals',
        },
      ],
    },
    stats: [
      { label: 'Founded', value: '2009' },
      { label: 'Team Size', value: '120+' },
      { label: 'Countries', value: '15+' },
      { label: 'Client Retention', value: '95%' },
    ],
  }
}

export async function getCasesPage(): Promise<CasesPage> {
  await delay()
  
  return {
    title: 'Case Studies - Phenix Labs',
    description: 'Success stories from our client projects',
    keywords: ['cases', 'portfolio', 'projects', 'success'],
    hero: {
      title: 'Case Studies',
      subtitle: 'Real Results from Real Projects',
      description: 'See how we\'ve helped businesses transform through technology.',
      cta: {
        text: 'Start Your Project',
        href: '/contact',
      },
    },
    cases: [
      {
        id: 'case-1',
        title: 'Enterprise Cloud Migration',
        description: 'Successfully migrated legacy infrastructure to cloud with zero downtime',
        category: 'Infrastructure',
        image: '/images/case-1.jpg',
        featured: true,
      },
      {
        id: 'case-2',
        title: 'FinTech Platform Launch',
        description: 'Built secure, scalable payment platform serving 500K+ users',
        category: 'Development',
        image: '/images/case-2.jpg',
        featured: true,
      },
      {
        id: 'case-3',
        title: 'AI-Powered Analytics',
        description: 'Implemented ML model that reduced processing time by 70%',
        category: 'Analytics',
        image: '/images/case-3.jpg',
      },
      {
        id: 'case-4',
        title: 'Mobile App Ecosystem',
        description: 'Developed suite of mobile apps with 2M+ downloads',
        category: 'Mobile',
        image: '/images/case-4.jpg',
      },
    ],
  }
}
