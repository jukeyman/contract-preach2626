interface Env {
  SENDGRID_API_KEY?: string
  SENDGRID_FROM_EMAIL?: string
}

interface ContactBody {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  message?: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  try {
    const body: ContactBody = await context.request.json()
    const { firstName, lastName, email, phone, company, service, message } = body

    if (!firstName || !lastName || !email || !phone || !company || !service || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const { env } = context

    if (env.SENDGRID_API_KEY) {
      const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: env.SENDGRID_FROM_EMAIL || 'info@thecontractingpreacher.com' }],
              subject: `New Contact: ${firstName} ${lastName} — ${company}`,
            },
          ],
          from: {
            email: env.SENDGRID_FROM_EMAIL || 'info@thecontractingpreacher.com',
            name: 'The Contracting Preacher Website',
          },
          reply_to: { email, name: `${firstName} ${lastName}` },
          content: [
            {
              type: 'text/html',
              value: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Service Interested In:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p style="color:#999;font-size:12px;">Submitted via The Contracting Preacher website contact form.</p>
              `,
            },
          ],
        }),
      })

      if (!sgResponse.ok) {
        console.error('SendGrid error:', await sgResponse.text())
      }
    } else {
      console.log('Contact form submission (no SendGrid key):', {
        firstName, lastName, email, phone, company, service, message,
        submittedAt: new Date().toISOString(),
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
