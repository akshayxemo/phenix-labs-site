'use client'

import { ContactForm } from '@/components/forms/ContactForm'

export function ContactFormClient() {
  return (
    <ContactForm
      idPrefix="project-enquiry"
      showPhone
      showCompany
      showSubscribe={false}
      submitButtonText="Send project enquiry"
    />
  )
}
