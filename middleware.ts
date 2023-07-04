export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/myrollerblog",
    "/post/newpost",
    "/profile/me",
    "/profile/[uid]",
    "/profile/update",
    "/profile/posts/[uid]",
    "/profile/favs/[uid]",
    "/profile/places/[uid]",
    "/business/create/[uid]",
  ],
};
