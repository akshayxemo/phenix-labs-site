'use client'

import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'
import { submitContactForm } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'

export interface ContactFormProps {
  initialEmail?: string
  initialName?: string
  onSuccess?: () => void
  submitButtonText?: string
  className?: string
  showPhone?: boolean
  showCompany?: boolean
  showSubscribe?: boolean
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
}

/**
 * Reusable Contact Form component with React Hook Form and Zod validation
 * Handles client-side validation, submission, and server-side processing
 */
export function ContactForm({
  initialEmail = '',
  initialName = '',
  onSuccess,
  submitButtonText = 'Send Message',
  className = '',
  showPhone = false,
  showCompany = false,
  showSubscribe = true,
}: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: initialName,
      email: initialEmail,
      subject: '',
      message: '',
      phone: '',
      company: '',
      subscribe: false,
    },
    mode: 'onBlur',
  })

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      setFormState({
        isSubmitting: true,
        isSuccess: false,
        isError: false,
        errorMessage: '',
      })

      try {
        const response = await submitContactForm(data)

        if (response.success) {
          setFormState({
            isSubmitting: false,
            isSuccess: true,
            isError: false,
            errorMessage: '',
          })
          reset()
          onSuccess?.()

          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setFormState((prev) => ({
              ...prev,
              isSuccess: false,
            }))
          }, 5000)
        } else {
          setFormState({
            isSubmitting: false,
            isSuccess: false,
            isError: true,
            errorMessage: response.message,
          })
        }
      } catch (error) {
        console.error('[ContactForm] Submission error:', error)
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: 'An unexpected error occurred. Please try again.',
        })
      }
    },
    [reset, onSuccess]
  )

  return (
    <div className={className}>
      {/* Success Message */}
      {formState.isSuccess && (
        <div
          className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
          role="alert"
          aria-live="polite"
        >
          <p className="text-green-800 font-medium">Thank you!</p>
          <p className="text-green-700 text-sm">
            We have received your message and will get back to you as soon as possible.
          </p>
        </div>
      )}

      {/* Error Message */}
      {formState.isError && (
        <div
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          role="alert"
          aria-live="polite"
        >
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-700 text-sm">{formState.errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={isSubmitting || formState.isSubmitting}
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isSubmitting || formState.isSubmitting}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Field (Optional) */}
        {showPhone && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              {...register('phone')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              disabled={isSubmitting || formState.isSubmitting}
            />
            {errors.phone && (
              <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
        )}

        {/* Company Field (Optional) */}
        {showCompany && (
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              id="company"
              type="text"
              placeholder="Your company name"
              {...register('company')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              aria-describedby={errors.company ? 'company-error' : undefined}
              disabled={isSubmitting || formState.isSubmitting}
            />
            {errors.company && (
              <p id="company-error" className="text-red-500 text-sm mt-1" role="alert">
                {errors.company.message}
              </p>
            )}
          </div>
        )}

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id="subject"
            type="text"
            placeholder="What is this about?"
            {...register('subject')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            disabled={isSubmitting || formState.isSubmitting}
          />
          {errors.subject && (
            <p id="subject-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Tell us more about your project..."
            rows={5}
            {...register('message')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            aria-describedby={errors.message ? 'message-error' : undefined}
            disabled={isSubmitting || formState.isSubmitting}
          />
          {errors.message && (
            <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Subscribe Checkbox (Optional) */}
        {showSubscribe && (
          <div className="flex items-center">
            <input
              id="subscribe"
              type="checkbox"
              {...register('subscribe')}
              className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting || formState.isSubmitting}
            />
            <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700">
              Subscribe to our newsletter
            </label>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || formState.isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={isSubmitting || formState.isSubmitting}
        >
          {isSubmitting || formState.isSubmitting ? 'Sending...' : submitButtonText}
        </Button>
      </form>
    </div>
  )
}

export default ContactForm
