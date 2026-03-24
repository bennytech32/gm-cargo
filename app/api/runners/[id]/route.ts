import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const waybills = await prisma.waybill.findMany({
      where: { registeredById: params.id }
    });
    
    const totalWaybills = waybills.length;
    const totalRevenue = waybills.reduce((sum, item) => sum + (item.shippingCost || 0), 0);
    
    return NextResponse.json({ totalWaybills, totalRevenue });
  } catch (error) {
    return NextResponse.json({ error: "Imeshindwa kuvuta data" }, { status: 500 });
  }
}