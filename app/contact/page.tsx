import type { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { getNavbarData, getFooterData } from '@/lib/config/site'
import { ContactFormClient } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact Us - Phenix Labs',
  description: 'Get in touch with our team for inquiries and project discussions',
  keywords: ['contact', 'inquiry', 'support'],
}

export default async function Contact() {
  const [navbar, footer] = await Promise.all([
    getNavbarData(),
    getFooterData(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HeroSection
        title="Contact Us"
        subtitle="Let's Start a Conversation"
        description="Have a question or ready to get started? We'd love to hear from you."
        cta={{ text: 'Scroll Down', href: '#contact' }}
      />
      <Section id="contact">
        <Container>
          <ContactFormContent />
        </Container>
      </Section>
    </MainLayout>
  )
}

function ContactFormContent() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-h3 mb-6">Get In Touch</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a
                href="mailto:hello@phenix-labs.com"
                className="text-primary hover:underline"
              >
                hello@phenix-labs.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline"
              >
                +1 (234) 567-890
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-muted-foreground">
                123 Tech Street
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactFormClient />
      </div>
    </div>
  )
}
