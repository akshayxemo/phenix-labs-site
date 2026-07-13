'use client'

import { ContactForm } from '@/components/forms/ContactForm'

export function ContactFormClient() {
  return <ContactForm showPhone showCompany showSubscribe submitButtonText="Send Message" />
}
