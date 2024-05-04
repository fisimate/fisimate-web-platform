import { NextResponse } from "next/server";
import checkIsLoggedIn from "./middlewares/checkIsLoggedIn";

export function middleware(request) {
  const token = request.cookies.get("token");
  const isLoggedIn = checkIsLoggedIn(token);

  if (request.nextUrl.pathname.startsWith("/auth/login") && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next).*)"],
};
