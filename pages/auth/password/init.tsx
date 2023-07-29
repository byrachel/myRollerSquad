import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import Link from "next/link";

import SidebarLayout from "views/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "views/components/sidebar/UnloggedUserSidebar";
import RegularButton from "views/components/buttons/RegularButton";
import InputText from "views/components/form/InputText";

const Password = () => {
  const [mailIsSent, setMailIsSent] = useState(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
    };

    const data = {
      email: target.email.value,
    };

    axios({
      method: "post",
      url: `/api/auth/initpassword`,
      data,
    }).then(() => setMailIsSent(true));
  };

  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <form onSubmit={onSubmit}>
          <div className="spaceBetween">
            <h3 className="mt5">Réinitialiser mot de passe</h3>
            <Link href="/auth/signin">
              <p className="mt5">X</p>
            </Link>
          </div>
          <div className="lightSeparator mt5" />
          {mailIsSent ? (
            <>
              <p className="mt-large">
                Si l'adresse email est valide et qu'un compte existe avec cette
                adresse,
                <b> consultez votre boite mail. </b>Vous y trouverez un lien
                pour réinitialiser votre mot de passe..
              </p>
              <p className="mt5">Pense aussi à vérifier dans tes spams ;-)</p>
            </>
          ) : (
            <>
              <InputText
                label="Identifiant (email)"
                placeholder="email"
                name="email"
                required
              />
              <RegularButton type="submit" style="full" text="VALIDER" />
            </>
          )}
        </form>
      }
    />
  );
};
export default Password;
