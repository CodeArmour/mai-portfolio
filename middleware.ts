import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for an admin page (except login)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.includes("/admin/login")) {
    // Check for the adminAuthenticated cookie
    const adminAuthenticated = request.cookies.get("adminAuthenticated")?.value === "true"

    // If not authenticated, redirect to login
    if (!adminAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/admin/:path*"],
}
