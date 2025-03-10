import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Получение требований
export async function GET() {
  try {
    const requirements = await prisma.requirement.findMany();
    return NextResponse.json(requirements);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch requirements' },
      { status: 500 }
    );
  }
}

// Обновление требований
export async function PUT(request: Request) {
  try {
    const requirements = await request.json();
    
    // Удаляем все существующие требования
    await prisma.requirement.deleteMany();
    
    // Создаем новые требования
    const createdRequirements = await Promise.all(
      requirements.map((req: any) =>
        prisma.requirement.create({
          data: {
            section: req.section,
            title: req.title,
            items: req.items,
          },
        })
      )
    );

    return NextResponse.json(createdRequirements);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update requirements' },
      { status: 500 }
    );
  }
} 