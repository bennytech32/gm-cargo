// app/api/waybills/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. KUSAJILI MZIGO MPYA (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Tengeneza Tracking Number kiotomatiki
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = `GMC-${randomNum}`;

    const newWaybill = await prisma.waybill.create({
      data: {
        trackingNumber: trackingNumber,
        senderName: body.senderName,
        senderPhone: body.senderPhone,
        receiverName: body.receiverName,
        receiverPhone: body.receiverPhone,
        destination: body.destination,
        description: body.description,
        weight: body.weight ? Number(body.weight) : null,
        shippingCost: body.shippingCost ? Number(body.shippingCost) : null,
        cargoValue: body.cargoValue ? Number(body.cargoValue) : null, // Tume-inject hapa
        registeredById: body.registeredById, 
      },
    });

    return NextResponse.json(
      { message: "Mzigo umesajiliwa kikamilifu", waybill: newWaybill },
      { status: 201 }
    );
  } catch (error) {
    console.error("Kosa wakati wa kusajili:", error);
    return NextResponse.json({ error: "Imeshindwa kusajili mzigo." }, { status: 500 });
  }
}

// 2. KUVUTA MIZIGO YOTE (GET) - Kwa ajili ya Admin Dashboard
export async function GET() {
  try {
    const waybills = await prisma.waybill.findMany({
      orderBy: {
        createdAt: 'desc', // Kuleta mzigo mpya uwe wa kwanza juu
      },
      include: {
        registeredBy: {
          select: { name: true } // Tunavuta na jina la Runner
        }
      }
    });

    return NextResponse.json(waybills, { status: 200 });
  } catch (error) {
    console.error("Kosa wakati wa kuvuta data:", error);
    return NextResponse.json({ error: "Imeshindwa kuvuta taarifa za mizigo." }, { status: 500 });
  }
}