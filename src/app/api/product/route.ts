// app/api/products/route.ts
import { NextResponse } from 'next/server';
import {db} from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, price, stock } = body;

    if (!name || !category || price === undefined || stock === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await db.query(
      'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
      [name, category, price, stock]
    );

    return NextResponse.json({
      id: (result as any).insertId,
      name,
      category,
      price,
      stock,
    }, { status: 201 });

  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
