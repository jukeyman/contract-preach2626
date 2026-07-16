interface Env {
  SENDGRID_API_KEY?: string
  SENDGRID_FROM_EMAIL?: string
}

interface BookingBody {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  notes?: string
  date?: string
  time?: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  try {
    const body: BookingBody = await context.request.json()
    const { firstName, lastName, email, phone, company, service, notes, date, time } = body

    if (!firstName || !lastName || !email || !phone || !company || !service || !date || !time) {
      return new Response(JSON.stringify({ error: 'All required fields must be filled' }), {
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
      // Send notification to Dr. McKnight
      const notificationResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: env.SENDGRID_FROM_EMAIL || 'info@thecontractingpreacher.com' }],
              subject: `📅 New Consultation Booking: ${firstName} ${lastName} — ${date} at ${time}`,
            },
          ],
          from: {
            email: env.SENDGRID_FROM_EMAIL || 'info@thecontractingpreacher.com',
            name: 'The Contracting Preacher Bookings',
          },
          reply_to: { email, name: `${firstName} ${lastName}` },
          content: [
            {
              type: 'text/html',
              value: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                  <h2 style="color: #1a365d;">New Consultation Booking</h2>
                  <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 16px 0;">
                    <p style="margin: 8px 0;"><strong>📅 Date:</strong> ${date}</p>
                    <p style="margin: 8px 0;"><strong>🕐 Time:</strong> ${time} EST</p>
                    <p style="margin: 8px 0;"><strong>⏱ Duration:</strong> 30 minutes</p>
                  </div>
                  <h3 style="color: #1a365d;">Client Details</h3>
                  <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Company:</strong> ${company}</p>
                  <p><strong>Service:</strong> ${service}</p>
                  ${notes ? `<p><strong>Notes:</strong> ${notes.replace(/\n/g, '<br>')}</p>` : ''}
                  <hr style="margin: 20px 0;">
                  <p style="color: #999; font-size: 12px;">Booked via The Contracting Preacher website.</p>
                </div>
              `,
            },
          ],
        }),
      })

      if (!notificationResponse.ok) {
        console.error('SendGrid notification error:', await notificationResponse.text())
      }

      // Send confirmation to client
      const confirmationResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email, name: `${firstName} ${lastName}` }],
              subject: `Your Free Consultation is Confirmed — ${date} at ${time} EST`,
            },
          ],
          from: {
            email: env.SENDGRID_FROM_EMAIL || 'info@thecontractingpreacher.com',
            name: 'Dr. McKnight — The Contracting Preacher',
          },
          content: [
            {
              type: 'text/html',
              value: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                  <h2 style="color: #1a365d;">Your Consultation is Confirmed!</h2>
                  <p>Hi ${firstName},</p>
                  <p>Thank you for booking a free consultation with The Contracting Preacher. Here are your details:</p>
                  <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #c5a04e;">
                    <p style="margin: 8px 0;"><strong>📅 Date:</strong> ${date}</p>
                    <p style="margin: 8px 0;"><strong>🕐 Time:</strong> ${time} EST</p>
                    <p style="margin: 8px 0;"><strong>⏱ Duration:</strong> 30 minutes</p>
                    <p style="margin: 8px 0;"><strong>📋 Service:</strong> ${service}</p>
                  </div>
                  <p>Dr. McKnight will call you at <strong>${phone}</strong> at the scheduled time.</p>
                  <h3 style="color: #1a365d;">What to Prepare</h3>
                  <ul>
                    <li>Your business details (name, structure, NAICS codes if known)</li>
                    <li>Any current SAM.gov registration or certifications</li>
                    <li>Questions about federal contracting you'd like answered</li>
                  </ul>
                  <p>If you need to reschedule, simply reply to this email or call (202) 276-2913.</p>
                  <p>Looking forward to helping you win federal contracts!</p>
                  <p><strong>Dr. McKnight</strong><br>The Contracting Preacher<br>thecontractingpreacher.com</p>
                </div>
              `,
            },
          ],
        }),
      })

      if (!confirmationResponse.ok) {
        console.error('SendGrid confirmation error:', await confirmationResponse.text())
      }
    } else {
      console.log('Booking submission (no SendGrid key):', {
        firstName, lastName, email, phone, company, service, notes, date, time,
        submittedAt: new Date().toISOString(),
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Consultation booked successfully' }),
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Booking error:', error)
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
