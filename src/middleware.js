import { NextResponse } from "next/server";
import checkIsLoggedIn from "./middlewares/checkIsLoggedIn";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const isLoggedIn = checkIsLoggedIn(token);

  if (isLoggedIn && request.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isLoggedIn && !request.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)",
  ],
  unstable_includeFiles: [
    "node_modules/next/dist/compiled/@edge-runtime/primitives/**/*.+(js|json)",
  ],
};
