import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
  const GMAIL_USER = 'knightsacgolf@gmail.com'

  if (!GMAIL_APP_PASSWORD) {
    return res.status(500).json({ error: 'GMAIL_APP_PASSWORD not configured in Vercel environment variables.' })
  }

  const { to, bcc, subject, html, fromName } = req.body
  if (!subject || !html) return res.status(400).json({ error: 'Missing subject or html' })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: `"${fromName || "Knight's Golf League"}" <${GMAIL_USER}>`,
      to: to || [GMAIL_USER],
      bcc: bcc && bcc.length > 0 ? bcc : undefined,
      subject,
      html,
    })
    return res.status(200).json({ success: true, id: info.messageId })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
