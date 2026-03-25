import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Hili ndio daraja letu imara

// Kuvuta mizigo yote (Dashboard)
export async function GET() {
  try {
    const waybills = await prisma.waybill.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(waybills);
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Imeshindwa kuvuta data" }, { status: 500 });
  }
}

// Kusajili mzigo mpya
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Tunauingiza mzigo kwenye Database kwa umakini
    const newWaybill = await prisma.waybill.create({
      data: {
        trackingNumber: body.trackingNumber,
        senderName: body.senderName,
        senderPhone: body.senderPhone,
        receiverName: body.receiverName,
        receiverPhone: body.receiverPhone,
        destination: body.destination,
        description: body.description || "",
        shippingCost: body.shippingCost,
        cargoValue: body.cargoValue,
        status: body.status,
        registeredById: body.registeredById, // Hapa ndipo ID ya Admin inaingia
      }
    });
    
    return NextResponse.json(newWaybill);
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Imeshindwa kusajili mzigo kwenye Database." }, { status: 500 });
  }
}