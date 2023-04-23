import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { verify } from "jsonwebtoken";
import axios from "axios";

import LoginForm from "src/components/auth/LoginForm";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "src/components/layouts/UnloggedUserSidebar";
import ActivationAccount from "src/components/auth/ActivationAccount";

const Login = () => {
  const router = useRouter();
  const { id, token } = router.query;
  const [userAccountIsActivate, setUserAccountIsActive] = useState<
    boolean | null
  >(null);

  const userId = id && typeof id === "string" ? parseInt(id) : null;

  useEffect(() => {
    async function activateUserAccount(
      token: string,
      id: number,
      secret: string
    ) {
      try {
        const tokenIsValid = verify(token, secret);

        if (!tokenIsValid) return setUserAccountIsActive(false);

        await axios
          .put("/api/auth/activate", { data: { id } })
          .then(() => setUserAccountIsActive(true))
          .catch(() => setUserAccountIsActive(false));
      } catch (error) {
        // console.error(error);
        setUserAccountIsActive(false);
      }
    }
    if (
      token &&
      typeof token === "string" &&
      userId &&
      process.env.NEXT_PUBLIC_JWT
    ) {
      activateUserAccount(token, userId, process.env.NEXT_PUBLIC_JWT);
    }
  }, [token, userId]);

  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <>
          {userAccountIsActivate ? (
            <LoginForm />
          ) : userAccountIsActivate === false ? (
            <ActivationAccount id={userId} />
          ) : (
            <div className="center">
              <div className="loader" />
            </div>
          )}
        </>
      }
    />
  );
};
export default Login;
