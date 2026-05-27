import { Resend } from 'resend';

const resendKey = process.env.RESEND_API_KEY;
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'jcburt17@gmail.com';

const resend = resendKey ? new Resend(resendKey) : null;

interface EmailPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function sendContactEmail(payload: EmailPayload) {
  const { name, email, company, message } = payload;
  const companyStr = company ? ` at ${company}` : '';

  const subject = `New Portfolio Inquiry from ${name}${companyStr}`;
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #B27B20; border-radius: 4px; white-space: pre-wrap;">
      ${message}
    </div>
    <br/>
    <hr/>
    <p style="font-size: 0.8rem; color: #666;">This message was sent from your portfolio contact form.</p>
  `;

  if (resend) {
    try {
      console.log(`[email] Dispatching email through Resend to ${receiverEmail}...`);
      const response = await resend.emails.send({
        // Resend's default sandbox address is onboarding@resend.dev, 
        // which can send to the account owner's email (jcburt17@gmail.com).
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: receiverEmail,
        subject: subject,
        html: html,
        replyTo: email,
      });

      if (response.error) {
        console.error('[email] Resend error:', response.error);
        return { success: false, error: response.error.message };
      }

      console.log('[email] Resend dispatch success:', response.data);
      return { success: true, data: response.data };
    } catch (err: unknown) {
      console.error('[email] Exception during Resend dispatch:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown email error';
      return { success: false, error: errorMessage };
    }
  } else {
    // Local development fallback log
    console.log('\n==================================================');
    console.log('[email] [MOCK] Outgoing Contact Email:');
    console.log(`To: ${receiverEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Reply-To: ${email}`);
    console.log('--- Content ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Company: ${company || 'None'}`);
    console.log(`Message: ${message}`);
    console.log('==================================================\n');
    return { success: true, data: { mock: true } };
  }
}
