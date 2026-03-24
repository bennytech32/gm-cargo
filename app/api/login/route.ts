import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Tunatafuta mtumiaji kwa jina (name) au simu (phone)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: username },
          { name: username }
        ]
      }
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Taarifa za kuingia sio sahihi." }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Akaunti hii imezimwa." }, { status: 403 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, name: user.name, role: user.role } 
    });

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Kosa la kimtandao. Database haipatikani." }, { status: 500 });
  }
}