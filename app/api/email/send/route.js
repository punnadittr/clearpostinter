import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, html } = body; // 'to' is replaced by 'email', 'subject' is now hardcoded

        if (!email || !html) { // Updated check for required fields
            return NextResponse.json({ error: 'Missing required fields (email, html)' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Clearpost <no-reply@mail.thailandcustomsclearance.com>',
            to: email, // Send to customer + admin copy
            subject: body.subject || 'Clearpost Notification',
            html: html, // Keep html field as it's still part of the body and useful
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
