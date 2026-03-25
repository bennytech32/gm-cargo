import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Hii inabadilisha Status ya Mzigo
export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { status } = await request.json();
    const updated = await prisma.waybill.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Imeshindwa kubadili hali" }, { status: 500 });
  }
}

// HII NDIO MPYA YA KUFUTA MZIGO
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    await prisma.waybill.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Imeshindwa kufuta mzigo" }, { status: 500 });
  }
}