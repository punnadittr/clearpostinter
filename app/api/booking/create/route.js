import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
    try {
        const body = await request.json();
        const { customer_name, customer_email, appointment_time, whatsapp } = body;

        // Validation
        if (!customer_name || !appointment_time || !customer_email || !whatsapp) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Security Hardening: Regex Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9]{8,15}$/; // Basic international phone check

        if (!emailRegex.test(customer_email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }
        if (!phoneRegex.test(whatsapp.replace(/\s/g, ''))) { // strip spaces for check
            return NextResponse.json({ error: 'Invalid WhatsApp format. Use numbers only.' }, { status: 400 });
        }

        // Security Hardening: Rate Limit Simulation (No-op for demo, but good practice placeholder)
        // await rateLimiter.check(request.ip);

        // 1. Double check availability (prevent race conditions in a real app)
        // For this demo, we skip detailed locking logic but do a quick check
        const { data: existing } = await supabase
            .from('appointments')
            .select('id')
            .eq('appointment_time', appointment_time)
            .single();

        if (existing) {
            return NextResponse.json({ error: 'Slot already taken' }, { status: 409 });
        }

        // 2. Create the appointment
        const { data, error } = await supabase
            .from('appointments')
            .insert([
                {
                    customer_name,
                    customer_email,
                    whatsapp,
                    appointment_time,
                    status: 'confirmed'
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, booking: data });

    } catch (error) {
        console.error("Booking Error:", error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
