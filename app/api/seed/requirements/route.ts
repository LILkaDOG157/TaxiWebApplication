import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Очищаем существующие требования
    await prisma.requirement.deleteMany();

    // Создаем новые требования
    const requirements = await Promise.all([
      prisma.requirement.create({
        data: {
          section: 'basic',
          title: 'Базовые требования',
          items: [
            'Возраст от 21 года',
            'Стаж вождения от 3 лет',
            'Отсутствие судимости',
            'Гражданство РФ'
          ]
        }
      }),
      prisma.requirement.create({
        data: {
          section: 'documents',
          title: 'Необходимые документы',
          items: [
            'Паспорт РФ',
            'Водительское удостоверение категории B',
            'Справка об отсутствии судимости',
            'Медицинская справка'
          ]
        }
      }),
      prisma.requirement.create({
        data: {
          section: 'car',
          title: 'Требования к автомобилю',
          items: [
            'Год выпуска не старше 5 лет',
            'Исправное техническое состояние',
            'Наличие детского кресла',
            'Наличие видеорегистратора'
          ]
        }
      })
    ]);

    return NextResponse.json({ message: 'Requirements seeded successfully', requirements });
  } catch (error) {
    console.error('Error seeding requirements:', error);
    return NextResponse.json(
      { error: 'Failed to seed requirements' },
      { status: 500 }
    );
  }
} 