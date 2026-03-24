import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Inatumia daraja la kudumu

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Tunatafuta admin kwa namba ya simu/username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { phone: username }
        ]
      }
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Taarifa sio sahihi." }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });

  } catch (error: any) {
    console.error("Database Error:", error);
    // Hii ndio inakuletea lile neno "Kosa la kimtandao"
    return NextResponse.json({ error: "Kosa la kimtandao. Database haionekani." }, { status: 500 });
  }
}