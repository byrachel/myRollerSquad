import React from "react";
import Link from "next/link";

import SidebarLayout from "views/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "views/components/sidebar/UnloggedUserSidebar";
import RegisterForm from "views/features/Authentication/RegisterForm";

import Roller from "views/svg/rollerquad.svg";

export default function Register() {
  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <>
          <h3 className="mt5">Créer un compte :</h3>

          <div className="lightSeparator mt5" />
          <RegisterForm />

          <Link href="/auth/signin" className="signinContainer">
            <Roller className="rollerColoredIcon" width={40} height={40} />
            <div className="link">
              <p>ou connecte-toi à ton compte</p>
            </div>
          </Link>
        </>
      }
    />
  );
}
