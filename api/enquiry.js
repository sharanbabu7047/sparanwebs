import nodemailer from 'nodemailer'

const GMAIL_USER = process.env.GMAIL_USER || 'sparanwebs@gmail.com'
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD || 'laupkmmayjszqasu').replace(/\s+/g, '')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
})

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, type, message, _gotcha } = req.body || {}

    // Honeypot check for bots
    if (_gotcha) {
      return res.status(200).json({ status: 'ok' })
    }

    // Input Validation
    if (!name || name.trim().length <= 1) {
      return res.status(400).json({ error: 'Please enter a valid name.' })
    }
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' })
    }
    if (!type) {
      return res.status(400).json({ error: 'Please select a project type.' })
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Please enter a project description.' })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanType = type.trim()
    const cleanMessage = message.trim()
    const currentYear = new Date().getFullYear()

    // 1. Admin Email (Delivered to sparanwebs@gmail.com)
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 20px; background-color: #0b1320; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #050a12; border: 1px solid #18364b; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #07528c, #078bcb); padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">SparanWebs New Client Enquiry</h1>
          </div>
          <div style="padding: 24px;">
            <p style="color: #94a3b8; font-size: 14px; margin-top: 0;">You have received a new project enquiry from your website contact form:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #080f19; border: 1px solid #1e293b; border-radius: 8px;">
              <tr><td style="padding: 10px 14px; color: #38bdf8; font-weight: bold; width: 130px; border-bottom: 1px solid #1e293b;">Name:</td><td style="padding: 10px 14px; color: #ffffff; border-bottom: 1px solid #1e293b;">${cleanName}</td></tr>
              <tr><td style="padding: 10px 14px; color: #38bdf8; font-weight: bold; border-bottom: 1px solid #1e293b;">Email:</td><td style="padding: 10px 14px; color: #ffffff; border-bottom: 1px solid #1e293b;"><a href="mailto:${cleanEmail}" style="color: #38bdf8;">${cleanEmail}</a></td></tr>
              <tr><td style="padding: 10px 14px; color: #38bdf8; font-weight: bold; border-bottom: 1px solid #1e293b;">Project Type:</td><td style="padding: 10px 14px; color: #ffffff; border-bottom: 1px solid #1e293b;">${cleanType}</td></tr>
              <tr><td style="padding: 10px 14px; color: #38bdf8; font-weight: bold;">Received:</td><td style="padding: 10px 14px; color: #94a3b8;">${new Date().toLocaleString()}</td></tr>
            </table>

            <div style="background-color: #0f172a; border-left: 4px solid #38bdf8; padding: 16px; border-radius: 4px; margin: 20px 0;">
              <h4 style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px;">Project Description:</h4>
              <p style="color: #e2e8f0; white-space: pre-wrap; line-height: 1.6; margin: 0; font-size: 14px;">${cleanMessage}</p>
            </div>

            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${cleanEmail}?subject=Re: Your SparanWebs Project Enquiry (${cleanType})" 
                 style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; display: inline-block;">
                Reply Directly to ${cleanName}
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // 2. Client Confirmation Email - Anti-Spam Optimized Template (Clean, High Reputation)
    const clientHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SparanWebs Project Enquiry</title>
      </head>
      <body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color: #050a12; padding: 28px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">SparanWebs</h1>
              <p style="margin: 4px 0 0 0; color: #38bdf8; font-size: 13px;">Premium Web Development Studio</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 20px; font-weight: 600;">Hello ${cleanName},</h2>
              <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px;">
                Thank you for contacting SparanWebs. We have successfully received your project enquiry regarding <strong>${cleanType}</strong>.
              </p>
              
              <!-- Next Steps Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-left: 4px solid #0284c7; border-radius: 6px; padding: 16px 20px; margin: 20px 0;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px; font-weight: 600;">What happens next?</h3>
                    <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 14px;">
                      <li style="margin-bottom: 8px;">Our team will review your project requirements and goals.</li>
                      <li style="margin-bottom: 8px;">We will reply to this email within one business day with details and next steps.</li>
                      <li>We will work together on timeline, architecture, and deliverables.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; color: #334155; font-size: 14px;">
                If you have any extra details or reference links to add in the meantime, simply <strong>reply directly to this email</strong> or write to us at <a href="mailto:${GMAIL_USER}" style="color: #0284c7; text-decoration: none;">${GMAIL_USER}</a>.
              </p>

              <p style="margin: 28px 0 0 0; color: #64748B; font-size: 14px;">
                Warm regards,<br>
                <strong style="color: #0f172a;">The SparanWebs Team</strong><br>
                <a href="https://sparanwebs.com" style="color: #0284c7; text-decoration: none; font-size: 13px;">sparanwebs.com</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; text-align: center; color: #94a3b8; font-size: 12px;">
              © ${currentYear} SparanWebs. All rights reserved.<br>
              You received this message because you submitted a contact request on our website.
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    // Plain text matching HTML perfectly (Crucial for passing anti-spam algorithms)
    const clientText = `Hello ${cleanName},

Thank you for contacting SparanWebs. We have successfully received your project enquiry regarding "${cleanType}".

What happens next?
1. Our team will review your project requirements and goals.
2. We will reply to this email within one business day with details and next steps.
3. We will work together on timeline, architecture, and deliverables.

If you have any extra details or reference links to add in the meantime, simply reply directly to this email or write to us at ${GMAIL_USER}.

Warm regards,
The SparanWebs Team
sparanwebs.com
`

    // Send Admin Notification
    const adminPromise = transporter.sendMail({
      from: `"SparanWebs Notifications" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: cleanEmail,
      subject: `New Project Enquiry: ${cleanType} from ${cleanName}`,
      text: `New Enquiry from ${cleanName} (${cleanEmail})\nProject Type: ${cleanType}\n\nMessage:\n${cleanMessage}`,
      html: adminHtml,
    })

    // Send Client Confirmation with anti-spam headers
    const clientPromise = transporter.sendMail({
      from: `"SparanWebs" <${GMAIL_USER}>`,
      to: cleanEmail,
      replyTo: GMAIL_USER,
      subject: `We received your project enquiry – SparanWebs`,
      text: clientText,
      html: clientHtml,
      headers: {
        'X-Entity-Ref-ID': Date.now().toString(),
        'X-Mailer': 'SparanWebs Notification System',
      },
    })

    await Promise.allSettled([adminPromise, clientPromise])

    return res.status(200).json({
      success: true,
      message: 'Message sent! We’ll reply within one working day.',
    })
  } catch (error) {
    console.error('Submission error:', error)
    return res.status(500).json({ error: 'Server error while processing your enquiry. Please try again.' })
  }
}
