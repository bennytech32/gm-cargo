import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { phone, password } = await request.json();
    
    // Tafuta mtumiaji kwa namba ya simu
    const user = await prisma.user.findUnique({ where: { phone } });
    
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Namba ya simu au Password sio sahihi." }, { status: 401 });
    }
    
    // Tukifanikiwa, tunamrudisha user (bila password)
    return NextResponse.json({ id: user.id, name: user.name, phone: user.phone, role: user.role });
  } catch (error) {
    return NextResponse.json({ error: "Kosa la kimtandao." }, { status: 500 });
  }
}