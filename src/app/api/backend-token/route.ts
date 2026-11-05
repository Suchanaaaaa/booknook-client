import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { SignJWT } from 'jose';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ message: 'Not signed in.' }, { status: 401 });
  const secret = process.env.API_JWT_SECRET;
  if (!secret || secret.length < 32) return Response.json({ message: 'API_JWT_SECRET is not configured.' }, { status: 500 });
  const token = await new SignJWT({ email: session.user.email, name: session.user.name })
    .setProtectedHeader({ alg: 'HS256' }).setSubject(session.user.id).setIssuedAt().setExpirationTime('10m')
    .sign(new TextEncoder().encode(secret));
  return Response.json({ token }, { headers: { 'Cache-Control': 'no-store' } });
}
