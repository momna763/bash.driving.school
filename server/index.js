const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_RECIPIENT']
const missing = requiredEnv.filter((key) => !process.env[key])
if (missing.length) {
  console.warn(`⚠️  Missing SMTP environment variables: ${missing.join(', ')}`)
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Boolean(process.env.SMTP_SECURE === 'true'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, lessonType, address, availability, message } = req.body || {}

  if (!name || !email || !phone || !lessonType || !address) {
    return res.status(400).json({ error: 'Missing required form fields.' })
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || `Bash Driving School <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT,
    subject: `New enquiry from ${name}`,
    text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLesson Type: ${lessonType}\nAddress: ${address}\nAvailability: ${availability || 'Not provided'}\nMessage: ${message || 'Not provided'}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.json({ success: true })
  } catch (error) {
    console.error('Failed to send email', error)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
