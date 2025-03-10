import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Получение контактной информации
export async function GET() {
  try {
    const contact = await prisma.contact.findFirst();
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching contact info' }, { status: 500 });
  }
}

// Обновление контактной информации
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const contact = await prisma.contact.upsert({
      where: { id: body.id || 'default' },
      update: {
        address: body.address,
        phone: body.phone,
        email: body.email,
        workingHours: body.workingHours,
        socialMedia: body.socialMedia,
      },
      create: {
        address: body.address,
        phone: body.phone,
        email: body.email,
        workingHours: body.workingHours,
        socialMedia: body.socialMedia,
      },
    });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating contact info' }, { status: 500 });
  }
} 