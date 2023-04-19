export const ironConfig = {
  cookieName: "myrollersquad_cookie",
  password: process.env.COOKIE_PASSWORD || "P@SSWORDS3CUR1TYFALLB4CK",
  ttl: 60 * 60 * 24 * 7, // 1 week
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
