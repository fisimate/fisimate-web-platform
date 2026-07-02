import { NextResponse } from "next/server";
import checkIsLoggedIn from "./middlewares/checkIsLoggedIn";

// Next 16: konvensi `middleware` diganti `proxy` (file src/proxy.js +
// fungsi bernama `proxy`). Logika auth-gate tetap sama.
export function proxy(request) {
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
};
