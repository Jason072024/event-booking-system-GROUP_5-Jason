import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Create a new event
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, date, location, price, organizerId } = body;

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date), // Convert string to Date object
        location,
        price: parseFloat(price),
        organizerId, // Tied directly to the user who created it
      },
    });

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}