import React from "react";
import Link from "next/link";

import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import LoginForm from "src/features/auth/LoginForm";

import Roller from "src/svg/rollerquad.svg";

export default function Signin() {
  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <>
          <h3 className="mt5">Se connecter :</h3>
          <div className="lightSeparator mt5" />

          <LoginForm />

          <Link href="/auth/register" className="signinContainer">
            <Roller className="rollerColoredIcon" width={40} height={40} />
            <div className="link">
              <p>Pas encore membre ? Clique ici et crée un compte !</p>
            </div>
          </Link>
        </>
      }
    />
  );
}
