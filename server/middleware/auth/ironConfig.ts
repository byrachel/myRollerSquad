import { IronSessionOptions } from "iron-session";

export const ironConfig = {
  cookieName: "myrollersquad_cookie",
  password: process.env.COOKIE_PASSWORD || "_P@SSWORD_*_S3CUR1TY_*_FALLB4CK_",
  ttl: 60 * 60 * 24, // 1 day
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
} as IronSessionOptions;
