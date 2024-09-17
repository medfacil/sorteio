import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export function middleware(req: NextRequest) {
  const publicRoutes = ['/', '/login'];
  const token = req.cookies.get('tokenSorteio')?.value;
  const pathname = req.nextUrl.pathname;
  
  console.log(token)
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const payload = jose.decodeJwt(token);
    const { exp } = payload;
    const currentTime = Math.floor(Date.now() / 1000);

    if (exp! < currentTime) {
      const response = NextResponse.redirect(new URL('/sign-in', req.url));
      response.cookies.delete('token');
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Erro ao decodificar o JWT:', error);
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}