export const ironConfig = {
  cookieName: "myrollersquad_cookie",
  password: process.env.COOKIE_PASSWORD || "_P@SSWORD_*_S3CUR1TY_*_FALLB4CK_",
  ttl: 60 * 60 * 24 * 7, // 1 week
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
