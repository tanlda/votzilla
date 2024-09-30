import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// const redirect = (request: NextRequest, pathname: string) => {
//   const url = request.nextUrl.clone()
//   url.pathname = pathname
//   return NextResponse.redirect(url)
// }

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)
  requestHeaders.set('x-origin', url.origin)
  requestHeaders.set('x-pathname', url.pathname)

  if (url.pathname.startsWith('/auth/login')) {
    requestHeaders.set('x-csp-enforce', 'true')
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/auth/login', '/auth/signup', '/polls'],
}
