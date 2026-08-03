'use client'

import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight, LoaderCircle } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'
import { submitContactForm } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'

export interface ContactFormProps {
  submitButtonText?: string
  className?: string
  showPhone?: boolean
  showCompany?: boolean
  showSubscribe?: boolean
  idPrefix?: string
}

interface FormState {
  isSuccess: boolean
  isError: boolean
  errorMessage: string
}

/**
 * Reusable Contact Form component with React Hook Form and Zod validation
 * Handles client-side validation, submission, and server-side processing
 */
export function ContactForm({
  submitButtonText = 'Send Message',
  className = '',
  showPhone = false,
  showCompany = false,
  showSubscribe = true,
  idPrefix = 'contact',
}: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>({
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
      name: '',
      email: '',
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
        isSuccess: false,
        isError: false,
        errorMessage: '',
      })

      try {
        const response = await submitContactForm(data)

        if (response.success) {
          setFormState({
            isSuccess: true,
            isError: false,
            errorMessage: '',
          })
          reset()

          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setFormState((prev) => ({
              ...prev,
              isSuccess: false,
            }))
          }, 5000)
        } else {
          setFormState({
            isSuccess: false,
            isError: true,
            errorMessage: response.message,
          })
        }
      } catch (error) {
        console.error('[ContactForm] Submission error:', error)
        setFormState({
          isSuccess: false,
          isError: true,
          errorMessage: 'An unexpected error occurred. Please try again.',
        })
      }
    },
    [reset]
  )

  const labelClassName = 'mb-2 block text-sm font-semibold text-[#334458]'
  const fieldClassName = 'w-full rounded-[14px] border border-[#c9d5df] bg-[#f8fafc] px-4 py-3.5 text-[#162236] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition placeholder:text-[#8a98a7] hover:border-[#aebfcd] focus:border-[#4b9ce7] focus:bg-white focus:ring-4 focus:ring-[#0064d7]/8 disabled:cursor-not-allowed disabled:opacity-60'
  const errorClassName = 'mt-1.5 text-sm text-[#c53e4a]'

  return (
    <div className={className}>
      {/* Success Message */}
      {formState.isSuccess && (
        <div
          className="mb-6 rounded-[14px] border border-green-200 bg-green-50 p-4"
          role="alert"
          aria-live="polite"
        >
          <p className="font-medium text-green-800">Thank you!</p>
          <p className="text-sm text-green-700">
            We have received your message and will get back to you as soon as possible.
          </p>
        </div>
      )}

      {/* Error Message */}
      {formState.isError && (
        <div
          className="mb-6 rounded-[14px] border border-red-200 bg-red-50 p-4"
          role="alert"
          aria-live="polite"
        >
          <p className="font-medium text-red-800">Error</p>
          <p className="text-sm text-red-700">{formState.errorMessage}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-5 sm:grid-cols-2"
        noValidate
      >
        {/* Name Field */}
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClassName}>
            Name <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            placeholder="Your name"
            {...register('name')}
            className={fieldClassName}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p id={`${idPrefix}-name-error`} className={errorClassName} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClassName}>
            Email <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
            className={fieldClassName}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p id={`${idPrefix}-email-error`} className={errorClassName} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Field (Optional) */}
        {showPhone && (
          <div>
            <label htmlFor={`${idPrefix}-phone`} className={labelClassName}>
              Phone
            </label>
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              placeholder="(123) 456-7890"
              {...register('phone')}
              className={fieldClassName}
              aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p id={`${idPrefix}-phone-error`} className={errorClassName} role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
        )}

        {/* Company Field (Optional) */}
        {showCompany && (
          <div>
            <label htmlFor={`${idPrefix}-company`} className={labelClassName}>
              Company
            </label>
            <input
              id={`${idPrefix}-company`}
              type="text"
              placeholder="Your company name"
              {...register('company')}
              className={fieldClassName}
              aria-describedby={errors.company ? `${idPrefix}-company-error` : undefined}
              disabled={isSubmitting}
            />
            {errors.company && (
              <p id={`${idPrefix}-company-error`} className={errorClassName} role="alert">
                {errors.company.message}
              </p>
            )}
          </div>
        )}

        {/* Subject Field */}
        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-subject`} className={labelClassName}>
            Subject <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id={`${idPrefix}-subject`}
            type="text"
            placeholder="What is this about?"
            {...register('subject')}
            className={fieldClassName}
            aria-describedby={errors.subject ? `${idPrefix}-subject-error` : undefined}
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p id={`${idPrefix}-subject-error`} className={errorClassName} role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-message`} className={labelClassName}>
            Message <span className="text-red-500" aria-label="required">*</span>
          </label>
          <textarea
            id={`${idPrefix}-message`}
            placeholder="Tell us more about your project..."
            rows={5}
            {...register('message')}
            className={`${fieldClassName} resize-none`}
            aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p id={`${idPrefix}-message-error`} className={errorClassName} role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Subscribe Checkbox (Optional) */}
        {showSubscribe && (
          <div className="flex items-center sm:col-span-2">
            <input
              id={`${idPrefix}-subscribe`}
              type="checkbox"
              {...register('subscribe')}
              className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <label htmlFor={`${idPrefix}-subscribe`} className="ml-2 text-sm text-gray-700">
              Subscribe to our newsletter
            </label>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 w-full gap-2 rounded-[14px] bg-[#0064d7] px-6 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(0,100,215,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0055b8] hover:shadow-[0_18px_42px_rgba(0,100,215,0.3)] disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
              Sending message
            </>
          ) : (
            <>
              {submitButtonText}
              <ArrowUpRight aria-hidden="true" size={18} />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
