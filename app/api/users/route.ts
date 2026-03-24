// admin-portal/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Vuta wafanyakazi wote
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, phone: true, role: true, isActive: true, createdAt: true }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Kosa kuvuta watumiaji" }, { status: 500 });
  }
}

// Tengeneza mfanyakazi mpya
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Hakikisha namba haijatumika
    const existing = await prisma.user.findUnique({ where: { phone: body.phone } });
    if (existing) {
      return NextResponse.json({ error: "Namba ya simu ishatumika." }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        phone: body.phone,
        password: body.password, // Kwenye mfumo halisi hii inapaswa kuwa hashed
        role: body.role
      }
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Kosa kusajili mtumiaji" }, { status: 500 });
  }
}