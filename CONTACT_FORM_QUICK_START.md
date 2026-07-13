# Contact Form - Quick Start Guide

## 30-Second Setup

```typescript
import { ContactForm } from '@/components/forms/ContactForm'

export default function MyPage() {
  return <ContactForm />
}
```

That's it! You have a fully functional contact form.

## Common Use Cases

### Contact Page (with all features)
```typescript
<ContactForm
  showPhone
  showCompany
  showSubscribe
  submitButtonText="Send Message"
/>
```

### Inline Form (minimal)
```typescript
<ContactForm
  submitButtonText="Get Started"
  className="max-w-md"
/>
```

### Pre-filled Form (for referrals)
```typescript
<ContactForm
  initialName="John Doe"
  initialEmail="john@example.com"
  onSuccess={() => navigate('/thank-you')}
/>
```

### Modal/Drawer (with callback)
```typescript
<ContactForm
  onSuccess={() => {
    closeModal()
    showToast('Thank you!')
  }}
/>
```

## What's Included

✓ React Hook Form integration  
✓ Zod validation (client + server)  
✓ Server Actions (no API routes needed)  
✓ Loading states  
✓ Error handling  
✓ Success messaging  
✓ Full accessibility (WCAG 2.1)  
✓ Responsive design  
✓ TypeScript types  

## Fields (All Optional to Show/Hide)

| Field | Always Shows | Optional Prop | Default |
|-------|-------------|--------------|---------|
| Name | Yes | - | - |
| Email | Yes | - | - |
| Subject | Yes | - | - |
| Message | Yes | - | - |
| Phone | No | showPhone | false |
| Company | No | showCompany | false |
| Newsletter | Yes | showSubscribe | true |

## Props Reference

```typescript
<ContactForm
  // Pre-fill fields
  initialEmail="user@example.com"
  initialName="John Doe"
  
  // Show/hide fields
  showPhone={true}
  showCompany={true}
  showSubscribe={true}
  
  // Customize
  submitButtonText="Send"
  className="my-custom-class"
  
  // Callback
  onSuccess={() => console.log('Sent!')}
/>
```

## Styling

The form uses Tailwind CSS classes. It's ready to use as-is, but you can:

1. **Add CSS classes** via `className` prop
2. **Wrap with custom container**:
   ```typescript
   <div className="max-w-2xl mx-auto">
     <ContactForm />
   </div>
   ```

3. **Override button styling** (edit component if needed)

## Validation Rules

| Field | Rules |
|-------|-------|
| **Name** | 2-100 chars, letters/spaces/hyphens only |
| **Email** | Valid email format, max 255 chars |
| **Subject** | 5-200 characters |
| **Message** | 10-5000 characters |
| **Phone** | (Optional) Valid phone format |
| **Company** | (Optional) Max 100 characters |

## Form States

### 1. Idle (default)
- All fields enabled
- Button text: "Send Message"

### 2. Loading (submitting)
- All fields disabled
- Button text: "Sending..."
- Can't click button

### 3. Success
- Green alert appears
- Form fields reset
- Alert disappears after 5 seconds

### 4. Error
- Red alert appears
- Form data preserved
- User can fix and resubmit

## File Locations

```
components/forms/ContactForm.tsx      ← Use this
lib/schemas/contact.ts                ← Validation
app/actions/contact.ts                ← Server logic
CONTACT_FORM_GUIDE.md                 ← Full docs
CONTACT_FORM_SUMMARY.md               ← Complete reference
```

## Integration Checklist

### Step 1: Use the Form
```typescript
import { ContactForm } from '@/components/forms/ContactForm'

export default function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  )
}
```

### Step 2: Test It
- Fill out the form
- Submit and see success message
- Check console logs
- Test required field validation

### Step 3: Connect Email Service
Edit `app/actions/contact.ts` and replace the placeholder:
```typescript
import { sendEmail } from '@/lib/email'  // Your service

await sendEmail({
  to: validatedData.email,
  template: 'contact-confirmation'
})
```

### Step 4: Deploy
```bash
git add .
git commit -m "Add contact form"
git push
# Deploy to Vercel
```

## Troubleshooting

**Form not working?**
1. Check browser console (F12)
2. Verify all required fields are filled
3. Check that dependencies are installed
4. Run `pnpm install` if needed

**Styles look off?**
1. Ensure Tailwind CSS is imported
2. Check that input styling is correct
3. Clear cache and refresh

**Not getting emails?**
1. Check the Server Action implementation
2. Verify email service is configured
3. Check environment variables
4. Check spam/junk folder

## Common Customizations

### Dark Mode
```typescript
// Already supports dark mode
// Form automatically adapts
```

### Custom Button
Edit `ContactForm.tsx` button styling:
```typescript
<Button
  className="w-full bg-your-color hover:bg-your-dark"
>
```

### Custom Success Message
Edit the success alert in `ContactForm.tsx`:
```typescript
<p className="text-green-700 text-sm">
  Your custom message here
</p>
```

### Add Required Disclaimer
```typescript
<ContactForm />
<p className="text-xs text-gray-500 mt-2">
  * Required fields
</p>
```

## Performance

- Small bundle size
- No unnecessary re-renders
- Optimized validation
- Lazy loading compatible
- Fast form interactions

## Accessibility

✓ WCAG 2.1 Level AA compliant  
✓ Screen reader friendly  
✓ Keyboard navigable  
✓ Clear error messages  
✓ Proper label associations  
✓ ARIA attributes  

Test with: [WAVE](https://wave.webaim.org/), [Axe DevTools](https://www.deque.com/axe/devtools/)

## TypeScript

```typescript
import type { ContactFormProps } from '@/components/forms/ContactForm'
import type { ContactFormData } from '@/lib/schemas/contact'

// Full type safety
const myProps: ContactFormProps = {
  showPhone: true,
  // IDE autocomplete works
}
```

## Environment Variables

When you integrate with an email service, add to `.env.local`:

```bash
ADMIN_EMAIL=admin@phenix-labs.com
SENDGRID_API_KEY=SG...
# or
RESEND_API_KEY=re_...
```

## Support

- **Full Guide**: See `CONTACT_FORM_GUIDE.md`
- **Reference**: See `CONTACT_FORM_SUMMARY.md`
- **Code**: See `components/forms/ContactForm.tsx`

## Next: Email Integration

When ready to send real emails, update `app/actions/contact.ts`:

### Option 1: Resend
```bash
pnpm add resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({
  from: 'contact@phenix-labs.com',
  to: validatedData.email,
  subject: 'Thank you!',
  html: `<p>We received your message</p>`
})
```

### Option 2: SendGrid
```bash
pnpm add @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

await sgMail.send({
  to: validatedData.email,
  from: 'contact@phenix-labs.com',
  subject: 'Thank you!',
  html: '...'
})
```

---

**Need More Help?**
- Read: `CONTACT_FORM_GUIDE.md` (complete reference)
- Check: `CONTACT_FORM_SUMMARY.md` (technical details)
- Code: Look at `components/forms/ContactForm.tsx` (well-commented)

**That's it! You're ready to go.** 🚀
