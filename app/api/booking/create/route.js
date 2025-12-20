import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
    try {
        const body = await request.json();
        const { customer_name, customer_email, appointment_time } = body;

        // Validation
        if (!customer_name || !appointment_time) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

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
