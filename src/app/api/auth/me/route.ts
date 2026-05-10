import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readVerifiedToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  const session = token ? await readVerifiedToken(token) : null;
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, email: session.email });
}
