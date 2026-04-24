import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'EMAIL_REQUIRED' }, { status: 400 });
    }

    // Send a notification to the admin
    // Note: If using a free Resend account, you can only send to the email you signed up with.
    const { data, error } = await resend.emails.send({
      from: 'CHOPPED. Newsletter <onboarding@resend.dev>',
      to: ['kozmo51488@gmail.com'],
      subject: `[CHOPPED. NEWSLETTER] New Subscriber: ${email}`,
      html: `
        <div style="font-family: monospace; background-color: #080808; color: #ffffff; padding: 40px; border: 1px solid #333333;">
          <h2 style="color: #FF0000; letter-spacing: 4px; margin-bottom: 20px; font-size: 24px;">NEW CLOCK-IN DETECTED</h2>
          <div style="border-top: 1px solid #333333; border-bottom: 1px solid #333333; padding: 20px 0; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; letter-spacing: 1px;"><strong>SUBSCRIBER_IDENTITY:</strong> ${email}</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; letter-spacing: 1px;"><strong>TIMESTAMP:</strong> ${new Date().toISOString()}</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; letter-spacing: 1px;"><strong>STATUS:</strong> PENDING_VALIDATION</p>
          </div>
          <p style="color: #666666; font-size: 10px; letter-spacing: 2px;">SECURE TRANSMISSION VIA CHOPPED. PROTOCOL</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message || 'RESEND_API_ERROR' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SYSTEM_FRICTION' },
      { status: 500 }
    );
  }
}
