import React, { useState } from "react";
import LoginForm from "app/components/auth/LoginForm";
import RegisterForm from "app/components/auth/RegisterForm";
import Roller from "app/svg/rollerquad.svg";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/layouts/UnloggedUserSidebar";

export default function Signin() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <>
          {showLoginForm ? (
            <>
              <div className="spaceBetween">
                <h3 className="mt5">Se connecter :</h3>
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => setShowLoginForm(false)}
                  onClick={() => setShowLoginForm(false)}
                >
                  <p className="link mt5">X</p>
                </div>
              </div>
              <div className="lightSeparator mt5" />

              <LoginForm />
              <hr />
              <div className="signinContainer">
                <Roller className="rollerColoredIcon" width={48} height={48} />
                <div
                  className="link mt5"
                  onClick={() => setShowLoginForm(false)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => setShowLoginForm(false)}
                >
                  <p>Pas encore membre ? Clique ici et crée un compte !</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="spaceBetween">
                <h3 className="mt5">Créer un compte :</h3>
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => setShowLoginForm(true)}
                  onClick={() => setShowLoginForm(true)}
                >
                  <p className="link mt5">X</p>
                </div>
              </div>
              <div className="lightSeparator mt5" />
              <RegisterForm />
            </>
          )}
        </>
      }
    />
  );
}
