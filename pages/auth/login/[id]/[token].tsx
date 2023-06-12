import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import Loader from "@/components/layouts/Loader";
import LoginForm from "src/features/auth/LoginForm";
import ActivationAccount from "src/features/auth/ActivationAccount";
import { accountActivation } from "src/features/auth/utils/services";
import { checkTokenValidity } from "src/utils/checkTokenValidity";

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
        accountActivation(userId, setUserAccountIsActive);
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
