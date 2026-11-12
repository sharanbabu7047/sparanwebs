import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const GMAIL_USER = process.env.GMAIL_USER || 'syntrawebs@gmail.com'
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD || 'ipzsabhhffvwvknd').replace(/\s+/g, '')

// Both emails will receive notifications when a client submits an enquiry
const ADMIN_EMAILS = [GMAIL_USER, process.env.SECONDARY_ADMIN_EMAIL || 'sparanwebs@gmail.com']

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
})

/**
 * Sends a notification email to SyntraWebs admins when a client submits an enquiry.
 */
export async function sendNotificationToAdmin({ name, email, type, message }) {
  if (!GMAIL_PASS) {
    console.warn('⚠️ GMAIL_APP_PASSWORD is not set in server/.env — skipping admin email notification.')
    return false
  }

  const subject = `🚀 New Project Enquiry: ${type} from ${name}`

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 20px; background-color: #0b1320; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #050a12; border: 1px solid #18364b; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(90deg, #07528c, #078bcb); padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">SyntraWebs New Client Enquiry</h1>
        </div>
        <div style="padding: 24px;">
          <p style="color: #94a3b8; font-size: 14px; margin-top: 0;">You have received a new project enquiry from your website contact form:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #080f19; border: 1px solid #1e293b; border-radius: 8px;">
            <tr><td style="padding: 10px 14px; color: #38bdf8; font-weight: bold; width: 130px; border-bottom: 1px solid #1e293b;">Name:</td><td style="padding: 10px 14px; color: #ffffff; border-bottom: 1px solid #1e293b;">${name}</td></tr>
            <tr><td style="padding: 10px 14px; color: #38bdf8; font-weight: bold; border-bottom: 1px solid #1e293b;">Email:</td><td style="padding: 10px 14px; color: #ffffff; border-bottom: 1px solid #1e293b;"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
            <tr><td style="padding: 10px 14px; color: #38bdf8; font-weight: bold; border-bottom: 1px solid #1e293b;">Project Type:</td><td style="padding: 10px 14px; color: #ffffff; border-bottom: 1px solid #1e293b;">${type}</td></tr>
            <tr><td style="padding: 10px 14px; color: #38bdf8; font-weight: bold;">Received:</td><td style="padding: 10px 14px; color: #94a3b8;">${new Date().toLocaleString()}</td></tr>
          </table>

          <div style="background-color: #0f172a; border-left: 4px solid #38bdf8; padding: 16px; border-radius: 4px; margin: 20px 0;">
            <h4 style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px;">Project Description:</h4>
            <p style="color: #e2e8f0; white-space: pre-wrap; line-height: 1.6; margin: 0; font-size: 14px;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="mailto:${email}?subject=Re: Your SyntraWebs Project Enquiry (${type})" 
               style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; display: inline-block;">
              Reply Directly to ${name}
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: `"SyntraWebs Notifications" <${GMAIL_USER}>`,
    to: ADMIN_EMAILS,
    replyTo: email,
    subject,
    text: `New Enquiry from ${name} (${email})\nProject Type: ${type}\n\nMessage:\n${message}`,
    html,
  })

  return true
}

/**
 * Sends a confirmation email to the client confirming their enquiry was received.
 */
export async function sendConfirmationToClient({ name, email, type }) {
  if (!GMAIL_PASS) return false

  const subject = `We received your project enquiry – SyntraWebs`
  const currentYear = new Date().getFullYear()

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SyntraWebs Project Enquiry</title>
    </head>
    <body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <tr>
          <td style="background-color: #050a12; padding: 28px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">SyntraWebs</h1>
            <p style="margin: 4px 0 0 0; color: #38bdf8; font-size: 13px;">Premium Web Development Studio</p>
          </td>
        </tr>
        <!-- Body Content -->
        <tr>
          <td style="padding: 32px 28px;">
            <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 20px; font-weight: 600;">Hello ${name},</h2>
            <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px;">
              Thank you for contacting SyntraWebs. We have successfully received your project enquiry regarding <strong>${type}</strong>.
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
              <strong style="color: #0f172a;">The SyntraWebs Team</strong><br>
              <a href="https://syntrawebs.com" style="color: #0284c7; text-decoration: none; font-size: 13px;">syntrawebs.com</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; text-align: center; color: #94a3b8; font-size: 12px;">
            © ${currentYear} SyntraWebs. All rights reserved.<br>
            You received this message because you submitted a contact request on our website.
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  const text = `Hello ${name},

Thank you for contacting SyntraWebs. We have successfully received your project enquiry regarding "${type}".

What happens next?
1. Our team will review your project requirements and goals.
2. We will reply to this email within one business day with details and next steps.
3. We will work together on timeline, architecture, and deliverables.

If you have any extra details or reference links to add in the meantime, simply reply directly to this email or write to us at ${GMAIL_USER}.

Warm regards,
The SyntraWebs Team
syntrawebs.com
`

  try {
    await transporter.sendMail({
      from: `"SyntraWebs" <${GMAIL_USER}>`,
      to: email,
      replyTo: GMAIL_USER,
      subject,
      text,
      html,
      headers: {
        'X-Entity-Ref-ID': Date.now().toString(),
        'X-Mailer': 'SyntraWebs Notification System',
      },
    })
  } catch (err) {
    console.warn('⚠️ Could not send confirmation to client:', err.message)
  }
}
