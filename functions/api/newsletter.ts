interface Env {
  SENDGRID_API_KEY?: string
  SENDGRID_FROM_EMAIL?: string
}

interface NewsletterBody {
  email?: string
  firstName?: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  try {
    const body: NewsletterBody = await context.request.json()
    const { email, firstName } = body

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
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
      try {
        // Add to SendGrid marketing contacts
        await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
          },
          body: JSON.stringify({
            contacts: [
              {
                email,
                ...(firstName && { first_name: firstName }),
              },
            ],
          }),
        })

        // Send welcome email
        const year = new Date().getFullYear()
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email, ...(firstName && { name: firstName }) }],
                subject: 'Welcome to The Contracting Preacher Newsletter!',
              },
            ],
            from: {
              email: env.SENDGRID_FROM_EMAIL || 'info@thecontractingpreacher.com',
              name: 'Dr. McKnight — The Contracting Preacher',
            },
            content: [
              {
                type: 'text/html',
                value: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:Georgia,serif;background:#f5f3ef;margin:0;padding:0;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">
    <div style="background:#0A1628;padding:40px 40px 30px;">
      <div style="color:#C9A84C;font-family:Montserrat,sans-serif;font-weight:700;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">The Contracting</div>
      <div style="color:#C9A84C;font-family:Montserrat,sans-serif;font-weight:900;font-size:24px;letter-spacing:2px;text-transform:uppercase;">Preacher</div>
    </div>
    <div style="padding:40px;">
      <h1 style="color:#0A1628;font-size:28px;margin-bottom:16px;line-height:1.3;">Welcome${firstName ? `, ${firstName}` : ''}! 🙏</h1>
      <p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:20px;">Thank you for joining The Contracting Preacher newsletter. You've just taken an important step toward understanding how to win federal government contracts.</p>
      <ul style="color:#4B5563;font-size:16px;line-height:1.8;margin-bottom:24px;padding-left:24px;">
        <li>Expert tips on SAM.gov registration and renewals</li>
        <li>Guides to SBA certifications (8(a), HUBZone, WOSB, SDVOSB)</li>
        <li>Proposal writing strategies that win</li>
        <li>Federal contracting news and updates</li>
      </ul>
      <div style="background:#F5F3EF;border-left:4px solid #C9A84C;padding:20px 24px;margin:28px 0;border-radius:0 8px 8px 0;">
        <p style="color:#0A1628;font-style:italic;font-size:17px;margin:0;line-height:1.6;">"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."</p>
        <p style="color:#C9A84C;font-size:14px;font-weight:600;margin:8px 0 0;">— Jeremiah 29:11</p>
      </div>
      <a href="https://thecontractingpreacher.com/free-consultation" style="display:inline-block;background:#C9A84C;color:#0A1628;font-family:Montserrat,sans-serif;font-weight:700;font-size:14px;padding:14px 28px;border-radius:8px;text-decoration:none;">
        Schedule Free Consultation →
      </a>
    </div>
    <div style="background:#060E1A;padding:24px 40px;text-align:center;">
      <p style="color:#6B7280;font-size:12px;margin:0 0 8px;">© ${year} The Contracting Preacher | South Carolina, United States</p>
      <p style="color:#6B7280;font-size:11px;margin:0;">You received this because you subscribed at thecontractingpreacher.com</p>
    </div>
  </div>
</body>
</html>`,
              },
            ],
          }),
        })
      } catch (emailError) {
        console.error('Email error:', emailError)
      }
    } else {
      console.log('Newsletter signup (no SendGrid key):', { email, firstName, subscribedAt: new Date().toISOString() })
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed to the newsletter' }),
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
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
