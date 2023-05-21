import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { ironConfig } from "server/middleware/auth/ironConfig";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const session = await getIronSession(req, res, ironConfig);

  const { user } = session as any;
  console.log("middleware user", user);

  if (!user || !user.id) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return res;
};

export const config = {
  matcher: [
    "/myrollerblog",
    "/post/newpost",
    "/profile/me",
    "/profile/[uid]",
    "/profile/update",
    "/profile/posts/[uid]",
    "/profile/favs/[uid]",
    "/business/create/[uid]",
  ],
};
