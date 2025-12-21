import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { password } = body;

        const ADMIN_PASSWORD = process.env.COORDINATOR_PASSWORD;

        if (password === ADMIN_PASSWORD) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
