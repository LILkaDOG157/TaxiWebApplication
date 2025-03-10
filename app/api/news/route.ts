import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Получение списка новостей
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching news' }, { status: 500 });
  }
}

// Создание новости
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const news = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
        status: body.status,
      },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating news' }, { status: 500 });
  }
} 