import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must not exceed 5000 characters'),
  
  phone: z
    .string()
    .max(20, 'Phone number must not exceed 20 characters')
    .optional()
    .refine(
      (val) => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val),
      'Please enter a valid phone number'
    ),
  
  company: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
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
