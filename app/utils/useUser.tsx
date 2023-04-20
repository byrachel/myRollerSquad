import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import { ironConfig } from "./ironConfig";

export default async function useUser() {
  const cookie = cookies().get(ironConfig.cookieName);

  if (cookie?.value) {
    const data = await unsealData(cookie.value, {
      password: ironConfig.password,
    });
    const user = data?.user as any;
    if (user?.isLoggedIn) return { isLoggedIn: true, ...user };
  }

  return { isLoggedIn: false };
}
