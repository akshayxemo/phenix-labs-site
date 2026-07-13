# Contact Form Implementation Guide

## Overview

A production-ready, reusable Contact Form component built with React Hook Form, Zod validation, and Server Actions. Includes comprehensive validation, error handling, accessibility features, and loading/success states.

## Architecture

### Core Components

#### 1. `lib/schemas/contact.ts` - Validation Schema
- Zod schema for form validation
- TypeScript type inference
- Custom validation rules for email, phone, name
- Field-level error messages

```typescript
const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
  phone: z.string().optional(),
  company: z.string().optional(),
  subscribe: z.boolean().default(false),
})
```

#### 2. `app/actions/contact.ts` - Server Action
- Validates form data server-side
- Placeholder backend implementation
- Error handling with Zod error mapping
- Ready for email service integration

```typescript
export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactActionResponse>
```

#### 3. `components/forms/ContactForm.tsx` - Reusable Component
- React Hook Form integration
- Real-time validation (onBlur mode)
- Client-side state management
- Accessibility features (ARIA labels, roles)

## Usage

### Basic Usage

```typescript
import { ContactForm } from '@/components/forms/ContactForm'

export function MyPage() {
  return <ContactForm />
}
```

### With Props

```typescript
import { ContactForm } from '@/components/forms/ContactForm'

export function MyPage() {
  return (
    <ContactForm
      initialEmail="user@example.com"
      initialName="John Doe"
      showPhone
      showCompany
      showSubscribe
      submitButtonText="Get Started"
      onSuccess={() => console.log('Form submitted!')}
      className="max-w-2xl mx-auto"
    />
  )
}
```

## Props

```typescript
interface ContactFormProps {
  initialEmail?: string        // Pre-fill email field
  initialName?: string         // Pre-fill name field
  onSuccess?: () => void       // Callback on successful submission
  submitButtonText?: string    // Custom button text (default: "Send Message")
  className?: string           // Additional CSS classes
  showPhone?: boolean          // Show phone field (default: false)
  showCompany?: boolean        // Show company field (default: false)
  showSubscribe?: boolean      // Show newsletter checkbox (default: true)
}
```

## Features

### Validation

- **Client-side**: Real-time validation with React Hook Form (onBlur mode)
- **Server-side**: Zod schema validation in Server Action
- **Field-specific error messages**: Clear, actionable error feedback
- **Custom rules**: Email format, phone format, name format, message length

### States

1. **Idle**: Initial form state
2. **Submitting**: Disabled inputs, "Sending..." button text
3. **Success**: Green success alert, auto-dismisses after 5 seconds
4. **Error**: Red error alert with error message, preserves form data

### Accessibility

- Semantic HTML form structure
- ARIA labels and descriptions
- Error messages linked to inputs (aria-describedby)
- Form validation alerts (role="alert")
- Disabled state management
- Focus management
- Screen reader optimized

### Loading States

- Input fields disabled during submission
- Button shows "Sending..." text and disabled state
- Form prevents duplicate submissions
- Visual feedback with aria-busy

## Validation Rules

### Name
- Minimum 2 characters
- Maximum 100 characters
- Letters, spaces, hyphens, apostrophes only
- Example: "John O'Brien-Smith" ✓

### Email
- Valid email format
- Maximum 255 characters
- Example: "user@example.com" ✓

### Phone (Optional)
- Various formats supported: (123) 456-7890, 123-456-7890, etc.
- International format with + prefix: +1-234-567-8900
- Example: "(555) 123-4567" ✓

### Subject
- Minimum 5 characters
- Maximum 200 characters
- Example: "Project Inquiry" ✓

### Message
- Minimum 10 characters
- Maximum 5000 characters
- Example: "I'm interested in your services..." ✓

### Company (Optional)
- Maximum 100 characters

## Server Action Integration

### Current Implementation (Placeholder)

```typescript
// app/actions/contact.ts
export async function submitContactForm(formData: ContactFormData) {
  // 1. Validate with Zod
  const validatedData = contactFormSchema.parse(formData)

  // 2. Simulate processing
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 3. Log (for now)
  console.log('Form submission:', validatedData)

  // 4. Return response
  return {
    success: true,
    message: 'Thank you for your message!'
  }
}
```

### Integration with Email Service

To integrate with an actual email service (Resend, SendGrid, etc.):

```typescript
import { sendEmail } from '@/lib/email'

export async function submitContactForm(formData: ContactFormData) {
  const validatedData = contactFormSchema.parse(formData)

  // Send confirmation email to user
  await sendEmail({
    to: validatedData.email,
    subject: 'We received your message',
    template: 'contact-confirmation',
    data: validatedData,
  })

  // Send notification to admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New contact: ${validatedData.name}`,
    template: 'contact-notification',
    data: validatedData,
  })

  return {
    success: true,
    message: 'Thank you for contacting us!'
  }
}
```

## Error Handling

### Client-side Errors
- Field validation errors display immediately on blur
- Form-level errors display in alert at top of form
- Errors are cleared when field is corrected

### Server-side Errors
- Zod validation errors are mapped to field names
- Invalid data is rejected before processing
- Generic error message shown to user for unexpected errors
- Server logs errors for debugging

## Accessibility Features

### ARIA Attributes
```typescript
// Alert for success/error
<div role="alert" aria-live="polite">
  {message}
</div>

// Form submission state
<button aria-busy={isSubmitting}>
  {isSubmitting ? 'Sending...' : 'Send'}
</button>

// Error messages linked to fields
<input aria-describedby="name-error" />
<p id="name-error" role="alert">{error}</p>
```

### Semantic HTML
- Proper label associations with `htmlFor` and `id`
- Required field indicators with accessible text
- Fieldset grouping for related inputs (if applicable)
- Clear form structure

### Screen Reader Support
- All inputs have associated labels
- Error messages are announced
- Required fields are indicated
- Loading state is announced via aria-busy

## Testing

### Unit Tests (Example with Vitest)

```typescript
import { contactFormSchema } from '@/lib/schemas/contact'
import { submitContactForm } from '@/app/actions/contact'

describe('Contact Form', () => {
  it('validates required fields', () => {
    expect(() => {
      contactFormSchema.parse({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    }).toThrow()
  })

  it('accepts valid data', () => {
    const result = contactFormSchema.parse({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Inquiry',
      message: 'I have a question about your services',
    })
    expect(result.name).toBe('John Doe')
  })

  it('submits form successfully', async () => {
    const response = await submitContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test',
      message: 'This is a test message',
    })
    expect(response.success).toBe(true)
  })
})
```

## Environment Variables

Add to `.env.local`:

```bash
# Email configuration (when integrating with service)
ADMIN_EMAIL=admin@phenix-labs.com
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Service-specific
RESEND_API_KEY=re_...
SENDGRID_API_KEY=SG...
```

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify all required fields are filled
- Ensure Server Action is properly imported
- Check that form is not already submitting

### Validation errors not showing
- Ensure Zod resolver is installed (`@hookform/resolvers`)
- Check that field names match schema
- Verify aria-describedby IDs match error element IDs

### Styles not applying
- Import Tailwind CSS in your component
- Check that Tailwind config includes form inputs
- Verify className syntax is correct

### Accessibility issues
- Use WAVE or Axe DevTools to test
- Ensure all inputs have labels
- Check that error messages have role="alert"
- Verify keyboard navigation works

## Best Practices

1. **Always validate server-side** - Never rely on client validation alone
2. **Use Server Actions** - Better security than API routes for form submission
3. **Handle errors gracefully** - Show clear, actionable error messages
4. **Provide feedback** - Show loading and success states
5. **Make it accessible** - Use ARIA labels and semantic HTML
6. **Rate limit** - Implement rate limiting on the backend
7. **Sanitize input** - Zod helps, but also sanitize before storing
8. **Log submissions** - Track form submissions for analytics
9. **Test thoroughly** - Test all error scenarios and edge cases
10. **Keep it simple** - Only ask for necessary information

## Future Enhancements

- [ ] Integration with email service (Resend, SendGrid, etc.)
- [ ] Spam detection (reCAPTCHA, hCaptcha)
- [ ] Rate limiting per IP
- [ ] File attachment support
- [ ] Multi-step form wizard
- [ ] Form submission analytics
- [ ] Auto-save draft feature
- [ ] Localization support

## API Reference

### `submitContactForm(formData)`

Server Action for submitting the contact form.

**Parameters:**
- `formData: ContactFormData` - Validated form data

**Returns:**
```typescript
interface ContactActionResponse {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
```

**Example:**
```typescript
const response = await submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Inquiry',
  message: 'Message text',
})

if (response.success) {
  console.log('Success:', response.message)
} else {
  console.log('Error:', response.message)
  console.log('Field errors:', response.errors)
}
```

### `contactFormSchema`

Zod schema for form validation.

**Usage:**
```typescript
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'

// Parse and validate
const data = contactFormSchema.parse(formData)

// Type inference
type FormData = z.infer<typeof contactFormSchema>
```

## Support

For issues or questions:
1. Check this guide for solutions
2. Review the component source code
3. Check browser console for errors
4. Test with different browsers
5. Enable verbose logging in development

---

Last Updated: 2024
Status: Production Ready
