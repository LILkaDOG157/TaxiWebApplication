import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const drivers = await prisma.driver.findMany({
      where: {
        application: {
          status: 'APPROVED'
        }
      },
      include: {
        application: {
          select: {
            name: true,
            phone: true,
            email: true,
            experience: true,
            carYear: true,
            hasLicense: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке списка водителей' },
      { status: 500 }
    );
  }
} 