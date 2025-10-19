// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Esta función es el guardia
export function middleware(request: NextRequest) {
  // 1. Revisa si el usuario tiene una "cookie" de autenticación
  //    Nosotros la llamaremos 'auth_token'
  const token = request.cookies.get('auth_token')?.value;

  // 2. Si el usuario está tratando de entrar a /admin...
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // ...y NO tiene el token...
    if (!token) {
      // ...lo echamos para la página de login.
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Si tiene el token o no va a /admin, lo dejamos pasar sin problemas.
  return NextResponse.next();
}

// Esta configuración le dice a Next.js en qué rutas debe ejecutar este middleware
export const config = {
  matcher: ['/admin/:path*'],
};