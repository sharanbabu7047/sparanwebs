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
    if (!message || message.trim().length < 50) {
      return res.status(400).json({ error: 'Project description must be at least 50 characters.' })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanType = type.trim()
    const cleanMessage = message.trim()

    // 1. Admin Email HTML
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #050A12; color: #FFFFFF; border-radius: 12px; border: 1px solid #18364B;">
        <h2 style="color: #20D5F5; margin-top: 0; font-size: 22px;">New Project Enquiry Received!</h2>
        <p style="color: #A8B8C9; font-size: 14px;">A new client submitted the contact form on SparanWebs.</p>
        
        <div style="background: #080F19; border: 1px solid #18364B; padding: 18px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 6px 0;"><strong style="color: #20D5F5;">Client Name:</strong> ${cleanName}</p>
          <p style="margin: 6px 0;"><strong style="color: #20D5F5;">Client Email:</strong> <a href="mailto:${cleanEmail}" style="color: #20D5F5;">${cleanEmail}</a></p>
          <p style="margin: 6px 0;"><strong style="color: #20D5F5;">Project Type:</strong> ${cleanType}</p>
          <p style="margin: 6px 0;"><strong style="color: #20D5F5;">Received At:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="background: #111E2D; border-left: 4px solid #20D5F5; padding: 16px; border-radius: 4px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #FFFFFF;">Project Description:</h4>
          <p style="color: #E2E8F0; white-space: pre-wrap; line-height: 1.6; margin: 0;">${cleanMessage}</p>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${cleanEmail}?subject=Re: Your SparanWebs Project Enquiry (${cleanType})" 
             style="background: linear-gradient(90deg,#07528C,#078BCB,#20D5F5); color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 24px; font-weight: bold; display: inline-block;">
            Reply to ${cleanName}
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #18364B; margin: 24px 0;" />
        <p style="color: #64748B; font-size: 12px; text-align: center; margin: 0;">
          SparanWebs Enquiry Notification System
        </p>
      </div>
    `

    // 2. Client Confirmation HTML
    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #050A12; color: #FFFFFF; border-radius: 12px; border: 1px solid #18364B;">
        <h2 style="color: #20D5F5; margin-top: 0; font-size: 22px;">Thank You, ${cleanName}!</h2>
        <p style="color: #E2E8F0; line-height: 1.6;">
          We have received your enquiry for <strong>${cleanType}</strong>. Our team will review your requirements and get back to you within one business day.
        </p>

        <div style="background: #080F19; border: 1px solid #18364B; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #20D5F5;">What happens next?</h4>
          <ol style="color: #A8B8C9; padding-left: 20px; margin: 0; line-height: 1.6;">
            <li>We review your goals, scope, and technical requirements.</li>
            <li>We reach out via email to discuss timeline, deliverables, and architecture.</li>
            <li>We prepare a clear proposal to kick off your build.</li>
          </ol>
        </div>

        <p style="color: #A8B8C9; font-size: 14px;">
          If you have any urgent details to add, feel free to reply directly to this email or reach us at <a href="mailto:${GMAIL_USER}" style="color: #20D5F5;">${GMAIL_USER}</a>.
        </p>
      </div>
    `

    // Send emails
    const adminPromise = transporter.sendMail({
      from: `"SparanWebs Notifications" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: cleanEmail,
      subject: `🚀 New Project Enquiry: ${cleanType} from ${cleanName}`,
      text: `New Enquiry from ${cleanName} (${cleanEmail})\nProject Type: ${cleanType}\n\nMessage:\n${cleanMessage}`,
      html: adminHtml,
    })

    const clientPromise = transporter.sendMail({
      from: `"SparanWebs" <${GMAIL_USER}>`,
      to: cleanEmail,
      subject: `We received your project enquiry – SparanWebs`,
      text: `Hi ${cleanName},\n\nWe received your enquiry for ${cleanType}. We will get back to you within one business day!\n\nBest regards,\nSparanWebs Team`,
      html: clientHtml,
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

