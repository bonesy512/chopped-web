import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { callsign, channel, subject, message } = await request.json();

    if (!callsign || !channel || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'CHOPPED. Transmit <onboarding@resend.dev>', // Update this to a verified domain when going live, e.g., inquiries@choppedunc.store
      to: ['kozmo51488@gmail.com'], // Or the user's preferred receiving email
      replyTo: channel,
      subject: `[CHOPPED. INQUIRY] ${subject} - ${callsign}`,
      html: `
        <div style="font-family: monospace; background-color: #080808; color: #ffffff; padding: 20px;">
          <h2 style="color: #ff0000;">NEW TRANSMISSION RECEIVED</h2>
          <hr style="border-color: #333333;" />
          <p><strong>CALLSIGN:</strong> ${callsign}</p>
          <p><strong>CHANNEL:</strong> ${channel}</p>
          <p><strong>SUBJECT:</strong> ${subject}</p>
          <hr style="border-color: #333333;" />
          <p><strong>MESSAGE:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
