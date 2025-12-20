import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { startOfDay, endOfDay, addMinutes, format, parseISO, isBefore } from 'date-fns';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date'); // YYYY-MM-DD

    if (!dateParam) {
        return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    try {
        const selectedDate = parseISO(dateParam);

        // Define work hours (e.g., 09:00 to 17:00)
        let startTime = startOfDay(selectedDate);
        startTime.setHours(9, 0, 0, 0);

        const endTime = endOfDay(selectedDate);
        endTime.setHours(17, 0, 0, 0);

        // Fetch existing appointments for this date
        const { data: busySlots, error } = await supabase
            .from('appointments')
            .select('appointment_time')
            .gte('appointment_time', startTime.toISOString())
            .lte('appointment_time', endTime.toISOString());

        if (error) throw error;

        // Generate all possible 30-min slots
        const availableSlots = [];
        let currentSlot = startTime;
        const now = new Date();

        while (isBefore(currentSlot, endTime)) {
            // Skip past times
            if (isBefore(currentSlot, now)) {
                currentSlot = addMinutes(currentSlot, 30);
                continue;
            }

            const slotIso = currentSlot.toISOString();

            // simple check if busy
            const isBusy = busySlots.some(busy => {
                const busyTime = new Date(busy.appointment_time);
                return busyTime.getTime() === currentSlot.getTime();
            });

            availableSlots.push({
                time: format(currentSlot, 'HH:mm'),
                iso: slotIso,
                available: !isBusy
            });

            currentSlot = addMinutes(currentSlot, 30);
        }

        return NextResponse.json({ slots: availableSlots });
    } catch (error) {
        console.error("Availability Error:", error);
        return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
    }
}
