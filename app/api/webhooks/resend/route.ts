import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();

    const svix_id = request.headers.get('svix-id');
    const svix_timestamp = request.headers.get('svix-timestamp');
    const svix_signature = request.headers.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('[CHOPPED. RESEND] Webhook missing required Svix headers.');
      return NextResponse.json(
        { error: 'MISSING_SVIX_HEADERS' },
        { status: 400 }
      );
    }

    const secret = process.env.RESEND_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET;
    if (!secret) {
      console.error('[CHOPPED. RESEND] RESEND_WEBHOOK_SECRET is not configured in environment variables.');
      return NextResponse.json(
        { error: 'WEBHOOK_SECRET_NOT_CONFIGURED' },
        { status: 500 }
      );
    }

    let event: any;
    try {
      event = resend.webhooks.verify({
        payload,
        headers: {
          id: svix_id,
          timestamp: svix_timestamp,
          signature: svix_signature,
        },
        webhookSecret: secret,
      });
    } catch (err: any) {
      console.error('[CHOPPED. RESEND] Webhook verification failed:', err.message || err);
      return NextResponse.json(
        { error: 'INVALID_SIGNATURE' },
        { status: 400 }
      );
    }

    const { type, data } = event;
    console.log(`[CHOPPED. RESEND] Received webhook event: ${type}`);

    switch (type) {
      case 'email.received': {
        console.log(`[CHOPPED. RESEND] Inbound email received from ${data?.from} to ${JSON.stringify(data?.to)} (Subject: "${data?.subject}")`);
        // Handle inbound email processing logic here (e.g. retrieve body via resend.emails.receiving.get if needed)
        break;
      }
      case 'email.sent': {
        console.log(`[CHOPPED. RESEND] Email sent to ${JSON.stringify(data?.to)} (ID: ${data?.email_id})`);
        break;
      }
      case 'email.delivered': {
        console.log(`[CHOPPED. RESEND] Email delivered to ${JSON.stringify(data?.to)} (ID: ${data?.email_id})`);
        break;
      }
      case 'email.delivery_delayed': {
        console.warn(`[CHOPPED. RESEND] Email delivery delayed for ${JSON.stringify(data?.to)} (ID: ${data?.email_id})`);
        break;
      }
      case 'email.bounced': {
        console.error(`[CHOPPED. RESEND] Email bounced for ${JSON.stringify(data?.to)} (ID: ${data?.email_id})`, data?.bounce);
        break;
      }
      case 'email.complained': {
        console.warn(`[CHOPPED. RESEND] Spam complaint received from ${JSON.stringify(data?.to)} (ID: ${data?.email_id})`);
        break;
      }
      case 'email.opened': {
        console.log(`[CHOPPED. RESEND] Email opened by ${JSON.stringify(data?.to)} (ID: ${data?.email_id})`);
        break;
      }
      case 'email.clicked': {
        console.log(`[CHOPPED. RESEND] Email link clicked by ${JSON.stringify(data?.to)} (Link: ${data?.click?.link})`);
        break;
      }
      case 'contact.created':
      case 'contact.updated':
      case 'contact.deleted': {
        console.log(`[CHOPPED. RESEND] Contact event (${type}): ${data?.email} (Audience: ${data?.audience_id})`);
        break;
      }
      case 'domain.created':
      case 'domain.updated':
      case 'domain.deleted': {
        console.log(`[CHOPPED. RESEND] Domain event (${type}): ${data?.name} (Status: ${data?.status})`);
        break;
      }
      default: {
        console.log(`[CHOPPED. RESEND] Unhandled webhook event type: ${type}`);
        break;
      }
    }

    return NextResponse.json({ received: true, type }, { status: 200 });
  } catch (error: any) {
    console.error('[CHOPPED. RESEND] Webhook handler error:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
