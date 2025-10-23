import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;
  
    if (!token) {
      const url = req.nextUrl.clone();
            
      url.pathname = "/"; // redirige al login
      return NextResponse.redirect(url);
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: [
      "/dashboard/:path*",
      "/almacen/:path*",
      "/productos/:path*",
      "/ventas/:path*",
      "/mesas/:path*",
      "/caja/:path*",
    ],
  };