import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
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
    if (
      token &&
      typeof token === "string" &&
      userId &&
      process.env.NEXT_PUBLIC_JWT
    ) {
      try {
        const decodedToken = jwt.decode(token, { complete: true }) as any;

        const dateNow = new Date();

        const tokenIsValid =
          decodedToken && decodedToken.payload.exp < dateNow.getTime()
            ? true
            : false;

        if (!tokenIsValid) return setUserAccountIsActive(false);

        axios
          .put("/api/auth/activate", { id: userId })
          .then(() => setUserAccountIsActive(true))
          .catch(() => setUserAccountIsActive(false));
      } catch (e) {
        setUserAccountIsActive(false);
      }
    }
  }, [token, userId]);

  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <>
          {userAccountIsActivate ? (
            <>
              <h3 className="mt5">Se connecter :</h3>
              <div className="lightSeparator mt5" />
              <LoginForm />
            </>
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
