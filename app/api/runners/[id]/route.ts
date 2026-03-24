import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tumeongeza Promise na await kwenye params
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params; // <--- UCHAWI MPYA UPO HAPA
    
    const waybills = await prisma.waybill.findMany({
      where: { registeredById: resolvedParams.id }
    });
    
    const totalWaybills = waybills.length;
    const totalRevenue = waybills.reduce((sum, item) => sum + (item.shippingCost || 0), 0);
    
    return NextResponse.json({ totalWaybills, totalRevenue });
  } catch (error) {
    return NextResponse.json({ error: "Imeshindwa kuvuta data" }, { status: 500 });
  }
}