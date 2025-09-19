const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security: hide tech stack
app.disable('x-powered-by');

// Middleware
// CORS: restrict to known origin (configure via FRONTEND_ORIGIN)
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  maxAge: 600,
}));

// Body size limit
app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, 'dist')));

// SMTP Configuration
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify SMTP connection
transporter.verify((error) => {
  if (error) {
    console.log('SMTP verification failed');
  } else {
    console.log('SMTP ready');
  }
});

// Simple in-memory rate limiting per IP
const ipRequestTimestamps = new Map();
const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const CONTACT_RATE_LIMIT_MAX = 5; // 5 requests per window

function isRateLimited(ipAddress) {
  const now = Date.now();
  const windowStart = now - CONTACT_RATE_LIMIT_WINDOW_MS;
  const timestamps = ipRequestTimestamps.get(ipAddress) || [];
  const recent = timestamps.filter((t) => t > windowStart);
  if (recent.length >= CONTACT_RATE_LIMIT_MAX) {
    return true;
  }
  recent.push(now);
  ipRequestTimestamps.set(ipAddress, recent);
  return false;
}

// Basic input sanitation and caps
const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
};

function sanitize(value) {
  if (typeof value !== 'string') return '';
  // Remove control chars, trim, and collapse excessive whitespace
  return value
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

    if (isRateLimited(ip)) {
      return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
    }

    // Sanitize
    let { name, email, subject, message } = req.body || {};
    name = sanitize(name);
    email = sanitize(email);
    subject = sanitize(subject);
    message = typeof message === 'string' ? message : '';

    // Caps
    if (name.length > LIMITS.name) name = name.slice(0, LIMITS.name);
    if (email.length > LIMITS.email) email = email.slice(0, LIMITS.email);
    if (subject.length > LIMITS.subject) subject = subject.slice(0, LIMITS.subject);
    if (message.length > LIMITS.message) message = message.slice(0, LIMITS.message);

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        ---
        This message was sent from your portfolio contact form.
        Reply directly to this email to respond to ${name}.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Message sent successfully! I\'ll get back to you soon.' 
    });

  } catch (error) {
    console.error('Error sending email');
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
