import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ trackingNumber: string }> }) {
  try {
    const resolvedParams = await params;
    
    const waybill = await prisma.waybill.findUnique({
      where: { trackingNumber: resolvedParams.trackingNumber.toUpperCase() },
      select: { 
        trackingNumber: true, 
        status: true, 
        destination: true, 
        senderName: true, 
        receiverName: true, 
        updatedAt: true 
      }
    });
    
    if (!waybill) {
      return NextResponse.json({ error: "Mzigo haujapatikana." }, { status: 404 });
    }
    
    return NextResponse.json(waybill);
  } catch (error) {
    return NextResponse.json({ error: "Kosa la kimtandao." }, { status: 500 });
  }
}