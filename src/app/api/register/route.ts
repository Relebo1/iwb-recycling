import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password, role } = await req.json();

  if (!username || !password || !role) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ error: 'Username already in use' }, { status: 409 });
    }

    await db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
