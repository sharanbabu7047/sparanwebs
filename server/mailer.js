import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const GMAIL_USER = process.env.GMAIL_USER || 'sparanwebs@gmail.com'
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '') // 16-character Google App Password

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
})

/**
 * Sends a notification email to SparanWebs when a client submits an enquiry.
 */
export async function sendNotificationToAdmin({ name, email, type, message }) {
  if (!GMAIL_PASS) {
    console.warn('⚠️ GMAIL_APP_PASSWORD is not set in server/.env — skipping admin email notification.')
    return false
  }

  const subject = `🚀 New Project Enquiry: ${type} from ${name}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #050A12; color: #FFFFFF; border-radius: 12px; border: 1px solid #18364B;">
      <h2 style="color: #20D5F5; margin-top: 0; font-size: 22px;">New Project Enquiry Received!</h2>
      <p style="color: #A8B8C9; font-size: 14px;">A new client submitted the contact form on SparanWebs.</p>
      
      <div style="background: #080F19; border: 1px solid #18364B; padding: 18px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 6px 0;"><strong style="color: #20D5F5;">Client Name:</strong> ${name}</p>
        <p style="margin: 6px 0;"><strong style="color: #20D5F5;">Client Email:</strong> <a href="mailto:${email}" style="color: #20D5F5;">${email}</a></p>
        <p style="margin: 6px 0;"><strong style="color: #20D5F5;">Project Type:</strong> ${type}</p>
        <p style="margin: 6px 0;"><strong style="color: #20D5F5;">Received At:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <div style="background: #111E2D; border-left: 4px solid #20D5F5; padding: 16px; border-radius: 4px; margin: 20px 0;">
        <h4 style="margin: 0 0 8px 0; color: #FFFFFF;">Project Description:</h4>
        <p style="color: #E2E8F0; white-space: pre-wrap; line-height: 1.6; margin: 0;">${message}</p>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${email}?subject=Re: Your SparanWebs Project Enquiry (${type})" 
           style="background: linear-gradient(90deg,#07528C,#078BCB,#20D5F5); color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 24px; font-weight: bold; display: inline-block;">
          Reply to ${name}
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #18364B; margin: 24px 0;" />
      <p style="color: #64748B; font-size: 12px; text-align: center; margin: 0;">
        SparanWebs Enquiry Notification System
      </p>
    </div>
  `

  await transporter.sendMail({
    from: `"SparanWebs Notifications" <${GMAIL_USER}>`,
    to: GMAIL_USER,
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

  const subject = `We received your project enquiry – SparanWebs`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #050A12; color: #FFFFFF; border-radius: 12px; border: 1px solid #18364B;">
      <h2 style="color: #20D5F5; margin-top: 0; font-size: 22px;">Thank You, ${name}!</h2>
      <p style="color: #E2E8F0; line-height: 1.6;">
        We have received your enquiry for <strong>${type}</strong>. Our team will review your requirements and get back to you within one business day.
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

      <hr style="border: none; border-top: 1px solid #18364B; margin: 24px 0;" />
      <p style="color: #64748B; font-size: 12px; text-align: center; margin: 0;">
        © ${new Date().getFullYear()} SparanWebs – Premium Web Development Studio
      </p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"SparanWebs Studio" <${GMAIL_USER}>`,
      to: email,
      subject,
      text: `Hi ${name},\n\nThank you for reaching out to SparanWebs. We have received your enquiry for ${type} and will reply within one business day.\n\nBest regards,\nSparanWebs Team`,
      html,
    })
  } catch (err) {
    console.warn('⚠️ Could not send confirmation to client:', err.message)
  }
}

