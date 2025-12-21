import { NextResponse } from 'next/server';

export async function POST(request) {
    // Use the API key from environment variables
    // IMPORTANT: You need to add DAILY_API_KEY to your .env.local file
    const DAILY_API_KEY = process.env.DAILY_API_KEY;

    if (!DAILY_API_KEY) {
        return NextResponse.json(
            { error: 'Daily API key not configured. Please add DAILY_API_KEY to .env.local' },
            { status: 500 }
        );
    }

    // Security Check
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.COORDINATOR_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Create a room that expires in 1 hour and is private (requires knocking)
        const payload = {
            privacy: 'private',
            properties: {
                enable_knocking: true,
                exp: Math.round(Date.now() / 1000) + 3600, // Expires in 1 hour
            },
        };

        console.log("Daily API Request Payload:", JSON.stringify(payload, null, 2));

        const response = await fetch('https://api.daily.co/v1/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${DAILY_API_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Daily API Error Response:", errorData);
            throw new Error(errorData.error || 'Failed to create room');
        }

        const roomData = await response.json();

        // Generate an owner token for this room
        const tokenPayload = {
            properties: {
                room_name: roomData.name,
                is_owner: true,
                user_name: "Legal Team (Host)",
            }
        };

        const tokenResponse = await fetch('https://api.daily.co/v1/meeting-tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${DAILY_API_KEY}`,
            },
            body: JSON.stringify(tokenPayload),
        });

        if (!tokenResponse.ok) {
            console.error("Failed to generate token", await tokenResponse.json());
            // Proceeding without token, but logging error
        }

        const tokenData = await tokenResponse.json();

        return NextResponse.json({
            ...roomData,
            token: tokenData.token
        });
    } catch (error) {
        console.error('Error creating Daily room:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
