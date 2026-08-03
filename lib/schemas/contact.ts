import { z } from 'zod'

/** Shared UI and validation limits for enquiry fields. */
export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 255,
  // E.164 permits at most 15 total digits across the calling and national codes.
  phone: 15,
  company: 100,
  subject: 200,
  message: 5_000,
} as const

/** Shared server/client validation contract for project enquiries. */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(CONTACT_FIELD_LIMITS.name, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(CONTACT_FIELD_LIMITS.email, 'Email must not exceed 255 characters'),
  
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(CONTACT_FIELD_LIMITS.subject, 'Subject must not exceed 200 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(CONTACT_FIELD_LIMITS.message, 'Message must not exceed 5000 characters'),
  
  phone: z
    .string()
    .max(CONTACT_FIELD_LIMITS.phone, 'Phone number must not exceed 15 digits')
    .optional()
    .refine(
      (value) => !value || /^\d{4,15}$/.test(value),
      'Phone number must contain digits only'
    ),
  
  company: z
    .string()
    .max(CONTACT_FIELD_LIMITS.company, 'Company name must not exceed 100 characters')
    .optional(),

  subscribe: z
    .boolean(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const contactFormFieldErrors = {
  name: 'Name is required and must be valid',
  email: 'Please provide a valid email address',
  subject: 'Subject is required',
  message: 'Message is required',
  phone: 'Phone number format is invalid',
  company: 'Company name is invalid',
}
