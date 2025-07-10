import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

type CreateLeadInput = {
  business: string;
  phone: string;
  upgraded?: boolean;
  fullName?: string;
  email?: string;
  website?: string;
};


type UpdateLeadInput = {
  id: string;
  fullName?: string;
  email?: string;
  website?: string;
  phone?: string;
};

export async function POST(req: NextRequest) {
  try {
    const data: CreateLeadInput = await req.json();
    console.log('POST data:', data);

    const newLead = await prisma.lead.create({
      data: {
        business: data.business,
        phone: data.phone,
        fullName: data.fullName ?? null,
        email: data.email ?? null,
        website: data.website ?? null,
        upgraded: data.upgraded ?? false,
      },
    });
    

    return NextResponse.json(newLead);
  } catch (error) {
    console.error('❌ POST Error:', error);
  
    return new NextResponse(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500 }
    );
  }
  
}

export async function PUT(req: NextRequest) {
  try {
    const data: UpdateLeadInput = await req.json();
    console.log('PUT data:', data);

    const updatedLead = await prisma.lead.update({
      where: { id: data.id },
      data: { 
        fullName: data.fullName ?? undefined,
        email: data.email ?? undefined,
        website: data.website ?? undefined,
        phone: data.phone ?? undefined,
      }
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error('❌ PUT Error:', error);
    return new NextResponse(
      `Error updating lead: ${(error as Error).message}`,
      { status: 500 }
    );
  }
}
