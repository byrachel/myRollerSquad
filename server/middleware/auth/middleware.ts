import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

export async function middleware(req: any) {
  const res = NextResponse.next();

  const session = (await getIronSession(req, res, ironConfig)) as any;
  if (!session?.user?.isLoggedIn) {
    // We need an absolute URL. This makes sure, we get the current host.
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }

  return res;
}
export const config = {
  matcher: [
    /* Matches all request paths except for the ones starting with: */
    "/((?!api/auth|login|signup|_next/static|favicon).*)",
  ],
};
