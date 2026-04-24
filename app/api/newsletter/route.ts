import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// Initialize Resend with API key from env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'EMAIL_REQUIRED' }, { status: 400 });
    }

    // 1. ADD TO AUDIENCE (Optional)
    // If you have a Resend Audience ID, it will add the contact.
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({
          email,
          unsubscribed: false,
          audienceId,
        });
      } catch (e) {
        console.error('Resend Audience Error:', e);
        // Continue anyway to send the welcome email
      }
    }

    // 2. READ NEWSLETTER TEMPLATE
    let newsletterHtml = '';
    try {
      const filePath = path.join(process.cwd(), 'emails', 'vol-01-newsletter.html');
      newsletterHtml = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      console.error('Failed to read newsletter template:', e);
      // Fallback simple message if file reading fails
      newsletterHtml = `
        <div style="font-family: monospace; background-color: #080808; color: #ffffff; padding: 40px;">
          <h2 style="color: #FF0000;">VOL 01 PROTOCOL ACTIVE</h2>
          <p>The world sleeps at midnight. We drop at 02:00 AM.</p>
          <p>Welcome to the system, ${email}.</p>
        </div>
      `;
    }

    // 3. SEND WELCOME EMAIL (The actual newsletter)
    // IMPORTANT: If your domain is not verified in Resend, you must use onboarding@resend.dev
    // and you can only send to your own email. 
    // To send to others, you MUST verify your domain (e.g. choppedunc.store).
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'CHOPPED. <onboarding@resend.dev>';
    
    const { data: userData, error: userError } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'STATUS: ACTIVE. VOL 01 PROTOCOL.',
      html: newsletterHtml,
    });

    if (userError) {
      console.error('Resend User Email Error:', userError);
      return NextResponse.json({ error: userError.message || 'RESEND_API_ERROR' }, { status: 400 });
    }

    // 4. NOTIFY ADMIN (Optional)
    const adminEmail = process.env.ADMIN_EMAIL || 'kozmo51488@gmail.com';
    await resend.emails.send({
      from: fromAddress,
      to: [adminEmail],
      subject: `[CHOPPED. SUBSCRIPTION] New Member: ${email}`,
      html: `
        <div style="font-family: monospace; background-color: #080808; color: #ffffff; padding: 20px;">
          <h3 style="color: #FF0000;">NEW CLOCK-IN</h3>
          <p>Identity: ${email}</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: userData });
  } catch (error: any) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SYSTEM_FRICTION' },
      { status: 500 }
    );
  }
}
