import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { ironConfig } from "./ironConfig";
import { IronSession } from "iron-session";

interface CustomIronSession extends IronSession {
  user: {
    id: number;
    role: string;
    isLoggedIn: boolean;
  };
}

export const ironSessionMiddleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = (await getIronSession(
    req,
    res,
    ironConfig
  )) as CustomIronSession;
  const { user } = session;
  return user;
};
