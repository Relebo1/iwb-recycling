// app/api/queries/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.query(
      'INSERT INTO queries (client_name, client_email, message, status, created_at) VALUES (?, ?, ?, "pending", NOW())',
      [name, email, message]
    );

    return NextResponse.json({ message: 'Query submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/queries error:', error);
    return NextResponse.json({ error: 'Failed to submit query' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM queries ORDER BY created_at DESC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('GET /api/queries error:', error);
    return NextResponse.json({ error: 'Failed to fetch queries' }, { status: 500 });
  }
}
