const FORM_NAME = 'project-enquiry'
const MAX_ENCODED_BODY_LENGTH = 8_000

interface EdgeContext {
  next(): Promise<Response>
}

function reject(message: string, status: number) {
  return Response.json({ success: false, message }, { status })
}

/**
 * Validates contact submissions at Netlify's edge before the Forms service stores them.
 * Platform rate limiting in `config` runs before this handler and cannot be bypassed by
 * disabling the browser's JavaScript.
 */
export default async function protectContactForm(
  request: Request,
  context: EdgeContext,
) {
  // GET serves the static form blueprint; only POST submissions need inspection.
  if (request.method !== 'POST') return context.next()

  const contentType = request.headers.get('content-type') || ''
  if (!contentType.startsWith('application/x-www-form-urlencoded')) {
    return reject('Unsupported submission format.', 415)
  }

  // Reject browser submissions initiated by a different origin.
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) {
    return reject('Cross-origin submissions are not accepted.', 403)
  }

  const encodedBody = await request.clone().text()
  if (encodedBody.length > MAX_ENCODED_BODY_LENGTH) {
    return reject('Submission is too large.', 413)
  }

  const form = new URLSearchParams(encodedBody)

  // The matching hidden React field stays empty for people; a value identifies a bot.
  if (form.get('bot-field')) return new Response(null, { status: 204 })

  const name = form.get('name')?.trim() || ''
  const email = form.get('email')?.trim() || ''
  const phone = form.get('phone')?.trim() || ''
  const company = form.get('company')?.trim() || ''
  const subject = form.get('subject')?.trim() || ''
  const message = form.get('message')?.trim() || ''
  const phoneParts = phone.match(/^\+(\d{1,3}) (\d{4,14})$/)
  const phoneDigitCount = phoneParts
    ? phoneParts[1].length + phoneParts[2].length
    : 0

  const isValid =
    form.get('form-name') === FORM_NAME &&
    name.length >= 2 &&
    name.length <= 100 &&
    email.length <= 255 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    (!phone || Boolean(phoneParts && phoneDigitCount <= 15)) &&
    company.length <= 100 &&
    subject.length >= 5 &&
    subject.length <= 200 &&
    message.length >= 10 &&
    message.length <= 5_000

  if (!isValid) return reject('Please check the submitted fields.', 400)

  return context.next()
}

/** Five attempts per minute is generous for people and restrictive for flooding bots. */
export const config = {
  path: '/__forms.html',
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
}
