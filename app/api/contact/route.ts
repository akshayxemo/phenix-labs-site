import { ContactDataSchema } from '@/lib/schemas'
import type { ContactResponse } from '@/types'

/**
 * POST /api/contact
 * Handles contact form submissions
 * Replace with actual email service (SendGrid, Resend, etc.)
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = ContactDataSchema.parse(body)

    // TODO: Send email using service like Resend, SendGrid, etc.
    console.log('Contact form submission:', validatedData)

    const response: ContactResponse = {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    }

    return Response.json(response)
  } catch (error) {
    console.error('Contact form error:', error)

    const response: ContactResponse = {
      success: false,
      message: 'There was an error processing your request. Please try again.',
    }

    return Response.json(response, { status: 400 })
  }
}
