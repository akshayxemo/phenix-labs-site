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
      title: 'Join With Our Crazy Invention',
      subtitle: 'Turning Dreams Into Reality',
      description:
        'Experience a technology-led creative company at the forefront of tailoring, integration, data and innovation. Our team of experts makes clients happy with our in-depth expertise.',
      cta: {
        text: 'Get Started',
        href: '/contact',
      },
    },
    stats: [
      { label: 'Designs Executed', value: '150+' },
      { label: 'Happy Clients', value: '50+' },
      { label: 'Years Of Experience', value: '12' },
      { label: 'Years Into The Business', value: '2' },
    ],
    whatWeDo: {
      title: 'Turning Dreams Into Reality',
      description:
        'Welcome to Phenix Labs, a cutting-edge creative company at the forefront of tailoring, integration, data and innovation. Our team of experts makes clients happy with our in-depth expertise. We believe the future of technology lies in the seamless integration of data across platforms. We create tailor-made solutions for every client that show the future of technology. We deliver our solutions through transparency and teamwork. We constantly improve our deliverables through our latest practices and continuous feedback.',
      services: [
        {
          id: 'research',
          title: 'Research',
          description: 'Uncovering user needs through thorough research methodologies and insight gathering',
          icon: 'target',
        },
        {
          id: 'development',
          title: 'Development',
          description: 'Building and iterating the product through rapid cycles and user feedback to stay aligned',
          icon: 'zap',
        },
        {
          id: 'education',
          title: 'Education',
          description: 'Educating and training the internal clients through supporting internal expansion education',
          icon: 'users',
        },
      ],
    },
    ourServices: {
      title: 'Our Services',
      description: 'We are continuously improving our recent feedback and working each day to improve our data and technology',
      services: [
        {
          id: 'ui-design',
          title: 'UI Design',
          description: 'Modern, user-centric UI design for engaging digital experiences',
          icon: 'palette',
        },
        {
          id: 'frontend',
          title: 'Frontend Development',
          description: 'Responsive and interactive frontend development with latest frameworks',
          icon: 'code',
        },
        {
          id: 'ai-development',
          title: 'AI Development',
          description: 'Artificial intelligence solutions powering intelligent systems',
          icon: 'cpu',
        },
        {
          id: 'prototyping',
          title: 'Prototyping & Testing',
          description: 'Rapid prototyping and comprehensive testing for quality assurance',
          icon: 'activity',
        },
      ],
    },
    ourInventions: {
      title: 'Our Inventions',
      description: 'Showcase of our innovative projects and groundbreaking solutions',
      inventions: [
        {
          id: 'inv-1',
          title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
          description:
            'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.',
          image: 'TODO: /images/invention-1.jpg', // Moon image
          bgColor: 'bg-slate-900',
        },
        {
          id: 'inv-2',
          title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
          description:
            'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text since the 1500s.',
          image: 'TODO: /images/invention-2.jpg', // Workspace image
          bgColor: 'bg-blue-900',
        },
        {
          id: 'inv-3',
          title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
          description:
            'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text since the 1500s.',
          image: 'TODO: /images/invention-3.jpg', // Iron Man image
          bgColor: 'bg-yellow-500',
        },
        {
          id: 'inv-4',
          title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
          description:
            'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text since the 1500s.',
          image: 'TODO: /images/invention-4.jpg', // Green tech image
          bgColor: 'bg-green-900',
        },
      ],
    },
    testimonials: {
      title: 'What Our Clients Say About Us',
      description:
        'Our mission is to drive progress and enhance the lives of our customers by delivering superior',
      testimonials: [
        {
          id: 'test-1',
          quote:
            'The team delivered exceptional results and exceeded our expectations with their innovative approach and attention to detail.',
          author: 'Karolski Chaanama',
          role: 'Senior Manager',
          rating: 4.8,
        },
        {
          id: 'test-2',
          quote:
            'Professional excellence and strategic thinking made all the difference. Highly recommended for any organization.',
          author: 'Karolski Chaanama',
          role: 'Senior Manager',
          rating: 4.8,
        },
        {
          id: 'test-3',
          quote:
            'Outstanding service with measurable business impact. Their expertise truly sets them apart from competitors.',
          author: 'Karolski Chaanama',
          role: 'Senior Manager',
          rating: 4.8,
        },
      ],
    },
    cta: {
      title: 'Get In Touch',
      description: 'Thank you for your interest in Phenix Labs. Reach out to us and we would be happy to connect.',
      buttonText: 'Send Message',
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
