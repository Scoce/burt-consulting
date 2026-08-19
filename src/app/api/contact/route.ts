import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // 1. Input Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Sanitize lengths to prevent buffer issues
    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 100);
    const cleanCompany = typeof company === 'string' ? company.trim().slice(0, 100) : null;
    const cleanMessage = message.trim().slice(0, 5000);

    // Simple Email Regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
    }

    // 2. Log in Neon Postgres Database
    console.log('[api/contact] Logging submission in database...');
    try {
      await query(
        `INSERT INTO contact_submissions (name, email, company, message) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id`,
        [cleanName, cleanEmail, cleanCompany, cleanMessage]
      );
    } catch (dbErr) {
      // We log but don't crash, allowing the email flow to continue in case database connection fails temporarily
      console.error('[api/contact] Database logging failed:', dbErr);
    }

    // 3. Dispatch Email Notification via Resend
    console.log('[api/contact] Dispatching email...');
    const emailResult = await sendContactEmail({
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany || undefined,
      message: cleanMessage,
    });

    if (!emailResult.success) {
      console.warn('[api/contact] Email failed to send, but submission was logged:', emailResult.error);
      // We still return 200 because the submission was captured in logs/db, but we flag a warning internally
    }

    return NextResponse.json({ success: true, message: 'Contact request recorded' });
  } catch (err: unknown) {
    console.error('[api/contact] Fatal error handling contact request:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
