import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

// middleware는 Edge Runtime에서 실행되므로 process.env 직접 사용
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('auth_token')?.value
  if (!token) return false
  try {
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authenticated = await isAuthenticated(request)

  if (pathname.startsWith('/dashboard')) {
    if (!authenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (pathname === '/login' && authenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
