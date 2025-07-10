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
