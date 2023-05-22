import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import LoginForm from "client/features/auth/LoginForm";
import SidebarLayout from "client/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "client/components/layouts/UnloggedUserSidebar";
import ActivationAccount from "client/features/auth/ActivationAccount";
import { checkTokenValidity } from "client/utils/checkTokenValidity";
import Loader from "client/components/layouts/Loader";

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
        const tokenIsValid = checkTokenValidity(token);
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
              <h3 className="mt5">Yeah ! Ton compte est activé !</h3>
              <div className="lightSeparator mt5" />
              <p className="mt5">
                <b>Tu n'as plus qu'à te connecter :</b>
              </p>

              <LoginForm />
            </>
          ) : userAccountIsActivate === false ? (
            <ActivationAccount id={userId} />
          ) : (
            <Loader text={"Dernières vérifications..."} />
          )}
        </>
      }
    />
  );
};
export default Login;
