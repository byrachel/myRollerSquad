import React, { useState } from "react";
import LoginForm from "src/components/auth/LoginForm";
import RegisterForm from "src/components/auth/RegisterForm";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "src/components/layouts/UnloggedUserSidebar";

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

              <LoginForm setShowLoginForm={setShowLoginForm} />
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
