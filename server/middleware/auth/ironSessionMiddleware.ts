import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { ironConfig } from "./ironConfig";

export const ironSessionMiddleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = (await getIronSession(req, res, ironConfig)) as any;
  const { user } = session;
  return user;
};
