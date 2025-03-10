import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Получение информации о компании
export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching about info' }, { status: 500 });
  }
}

// Обновление информации о компании
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const about = await prisma.about.upsert({
      where: { id: body.id || 'default' },
      update: {
        title: body.title,
        description: body.description,
        mission: body.mission,
        values: body.values,
      },
      create: {
        title: body.title,
        description: body.description,
        mission: body.mission,
        values: body.values,
      },
    });
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating about info' }, { status: 500 });
  }
} 