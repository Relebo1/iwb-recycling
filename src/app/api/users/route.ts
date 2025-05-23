import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // your db pool
import bcrypt from 'bcrypt';

// const pool = db();

export async function GET() {
  try {
    const [rows] = await db.query('SELECT id, username, role FROM users');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, password, role } = await req.json();

    if (!username || !password || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );

    // Get inserted id
    // @ts-ignore
    const insertedId = result.insertId;

    return NextResponse.json({ id: insertedId, username, role }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}
