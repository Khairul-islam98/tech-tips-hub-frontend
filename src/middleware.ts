import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth-services";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];
const privateRoute = ["/profile"];

const roleBasedPrivateRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }
  if (user && privateRoute.includes(pathname)) {
    return NextResponse.next();
  }

  if (user?.role && roleBasedPrivateRoutes[user?.role as Role]) {
    const routes = roleBasedPrivateRoutes[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/profile", "/login", "/register", "/user/:page*", "/admin/:page*"],
};
