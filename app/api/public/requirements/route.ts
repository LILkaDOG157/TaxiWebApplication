import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Fetching requirements...');
    const requirements = await prisma.requirement.findMany({
      orderBy: {
        section: 'asc',
      },
    });
    console.log('Requirements fetched:', requirements);
    return NextResponse.json(requirements);
  } catch (error) {
    console.error('Error fetching requirements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requirements', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 