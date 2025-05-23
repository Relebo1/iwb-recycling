// app/api/sales/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_id, quantity } = body;

    if (!product_id || !quantity || quantity < 1) {
      return NextResponse.json({ error: 'Invalid sale data' }, { status: 400 });
    }

    await db.query(
      'INSERT INTO sales (product_id, quantity, sale_date) VALUES (?, ?, NOW())',
      [product_id, quantity]
    );

    return NextResponse.json({ message: 'Sale recorded successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/sales error:', error);
    return NextResponse.json({ error: 'Failed to record sale' }, { status: 500 });
  }
}
