import nodemailer from 'nodemailer';
import { config } from '../config';
import { logAction } from '../middleware/auditLog';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

interface EmailTemplate {
  subject: string;
  text: string;
  html?: string;
}

const templates: Record<string, EmailTemplate> = {
  withdrawal_approved: {
    subject: 'Withdrawal Approved',
    text: 'Your withdrawal of ${{amount}} has been processed.',
    html: '<p>Your withdrawal of ${{amount}} has been processed.</p>'
  },
  payment_received: {
    subject: 'Payment Received',
    text: 'Your payment of ${{amount}} was successful.'
  }
};

export const sendEmail = async (
  to: string,
  templateName: string,
  data: Record<string, any>,
  userId?: string
) => {
  try {
    const template = templates[templateName];
    if (!template) throw new Error('Invalid template');

    let text = template.text;
    let html = template.html;
    
    // Replace placeholders
    Object.entries(data).forEach(([key, value]) => {
      text = text.replace(`{{${key}}}`, value);
      html = html?.replace(`{{${key}}}`, value);
    });

    await transporter.sendMail({
      from: config.email.from,
      to,
      subject: template.subject,
      text,
      html
    });

    await logAction({
      userId: userId || 'system',
      actionType: 'email_sent',
      details: `Sent ${templateName} to ${to}`
    });

  } catch (error) {
    console.error('Email failed:', error);
    await logAction({
      userId: userId || 'system',
      actionType: 'email_failed',
      details: `Failed to send ${templateName} to ${to}`
    });
  }
}; 