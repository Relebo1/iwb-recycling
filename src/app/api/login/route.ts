import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';  // Use bcryptjs or bcrypt, be consistent with register
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = (rows as any[])[0];

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Return role to frontend
    return NextResponse.json({ message: 'Login successful', role: user.role }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
