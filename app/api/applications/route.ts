import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const application = await prisma.driverApplication.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        experience: parseInt(data.experience),
        carYear: parseInt(data.carYear),
        hasLicense: data.hasLicense,
        status: 'NEW',
        createdAt: new Date(),
      }
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
} 