import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { isActive } = await request.json();
    const driverId = params.id;

    const updatedDriver = await prisma.driver.update({
      where: { id: driverId },
      data: { isActive },
      include: {
        application: {
          select: {
            name: true,
            phone: true,
            email: true,
            experience: true,
          },
        },
      },
    });

    return NextResponse.json(updatedDriver);
  } catch (error) {
    console.error('Error updating driver status:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении статуса водителя' },
      { status: 500 }
    );
  }
} 