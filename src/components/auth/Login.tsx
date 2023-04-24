import React, { useState } from "react";

import LoginForm from "src/components/auth/LoginForm";
import RegisterForm from "src/components/auth/RegisterForm";
import SidebarLayout from "../layouts/SidebarLayout";
import UnloggedUserSidebar from "../layouts/UnloggedUserSidebar";

import Roller from "src/svg/rollerquad.svg";

export default function Login() {
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
              <br />
              <div
                className="signinContainer"
                onClick={() => setShowLoginForm(false)}
                role="button"
                tabIndex={0}
                onKeyDown={() => setShowLoginForm(false)}
              >
                <Roller className="rollerColoredIcon" width={50} height={50} />
                <div className="link">
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
