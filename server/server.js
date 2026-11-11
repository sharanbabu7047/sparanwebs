import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import { sendNotificationToAdmin, sendConfirmationToClient } from './mailer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.options('*', cors())
app.use(express.json())

// Rate limiting: max 5 requests per 15 minutes per IP to prevent spam
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many enquiries from this IP. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '🚀 SparanWebs Backend API is running smoothly!',
    endpoints: {
      health: 'GET /api/health',
      enquiry: 'POST /api/enquiry',
    },
  })
})

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SparanWebs Email Service', timestamp: new Date() })
})

// Submit Enquiry & Send Email
app.post('/api/enquiry', enquiryLimiter, async (req, res) => {
  try {
    const { name, email, type, message, _gotcha } = req.body

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

    // Send emails via Gmail (Nodemailer)
    const adminEmailPromise = sendNotificationToAdmin({
      name: cleanName,
      email: cleanEmail,
      type: cleanType,
      message: cleanMessage,
    })

    const clientEmailPromise = sendConfirmationToClient({
      name: cleanName,
      email: cleanEmail,
      type: cleanType,
    })

    await Promise.allSettled([adminEmailPromise, clientEmailPromise])

    console.log(`✉️ Enquiry from ${cleanName} (${cleanEmail}) delivered to sparanwebs@gmail.com`)

    return res.status(200).json({
      success: true,
      message: 'Message sent! We’ll reply within one working day.',
    })
  } catch (error) {
    console.error('Submission error:', error)
    return res.status(500).json({ error: 'Server error while processing your enquiry. Please try again.' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SparanWebs email backend running on http://localhost:${PORT}`)
})
