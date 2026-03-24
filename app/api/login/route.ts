import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Tunatafuta mtumiaji kwa kutumia Simu (phone)
    // Kama kwenye schema yako unatumia 'email' badala ya 'username', badilisha hapa chini
    const user = await prisma.user.findFirst({
      where: {
        phone: username // Hapa 'username' ni kile alichotype admin (simu yake)
      }
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Taarifa sio sahihi." }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: { id: user.id, phone: user.phone } });

  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Kosa la kimtandao. Jaribu tena." }, { status: 500 });
  }
}