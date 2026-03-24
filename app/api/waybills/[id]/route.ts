import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Kuvuta mizigo yote
export async function GET() {
  try {
    const waybills = await prisma.waybill.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(waybills);
  } catch (error) {
    return NextResponse.json({ error: "Imeshindwa kuvuta data" }, { status: 500 });
  }
}

// Kutengeneza mzigo mpya
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newWaybill = await prisma.waybill.create({
      data: body
    });
    return NextResponse.json(newWaybill);
  } catch (error) {
    return NextResponse.json({ error: "Imeshindwa kutengeneza mzigo" }, { status: 500 });
  }
}