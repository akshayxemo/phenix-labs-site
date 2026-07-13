'use server'

import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'

export interface ContactActionResponse {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

/**
 * Server Action for processing contact form submissions
 * Validates data with Zod schema, then sends email via placeholder backend
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactActionResponse> {
  try {
    // Validate form data with Zod schema
    const validatedData = contactFormSchema.parse(formData)

    // Placeholder: Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO: Replace with actual email service (Resend, SendGrid, etc.)
    // Example:
    // import { sendEmail } from '@/lib/email'
    // await sendEmail({
    //   to: validatedData.email,
    //   subject: 'Thank you for contacting Phenix Labs',
    //   template: 'contact-confirmation',
    //   data: validatedData,
    // })
    //
    // // Send notification to admin
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: 'New contact form submission from ' + validatedData.name,
    //   template: 'contact-notification',
    //   data: validatedData,
    // })

    console.log('[Contact Form] Submission received:', {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    }
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof Error && 'issues' in error) {
      const zodError = error as any
      const fieldErrors: Record<string, string[]> = {}

      for (const issue of zodError.issues) {
        const path = issue.path.join('.')
        if (!fieldErrors[path]) {
          fieldErrors[path] = []
        }
        fieldErrors[path].push(issue.message)
      }

      return {
        success: false,
        message: 'Please check the form for errors',
        errors: fieldErrors,
      }
    }

    // Handle other errors
    console.error('[Contact Form] Error:', error)
    return {
      success: false,
      message: 'An error occurred while processing your request. Please try again.',
    }
  }
}
