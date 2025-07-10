import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('POST data:', data);

    const newLead = await prisma.lead.create({
      data: {
        business: data.business,
        phone: data.phone,
        upgraded: data.upgraded ?? false,
      },
    });

    return NextResponse.json(newLead);
  } catch (error) {
    console.error('❌ POST Error:', error);
    return new NextResponse('Error creating lead', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('PUT data:', data);

    const updated = await prisma.lead.update({
      where: { id: data.id },
      data: {
        fullName: data.fullName,
        email: data.email,
        website: data.website,
        phone: data.phone,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('❌ PUT Error:', error);
    return new NextResponse('Error updating lead', { status: 500 });
  }
}
