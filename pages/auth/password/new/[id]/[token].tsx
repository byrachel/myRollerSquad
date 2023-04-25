import React, { SyntheticEvent } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import axios from "axios";

import SidebarLayout from "src/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "src/components/layouts/UnloggedUserSidebar";
import RegularButton from "@/components/buttons/RegularButton";
import InputPassword from "@/components/form/InputPassword";

const NewPassword = () => {
  const router = useRouter();
  const params = router.query;
  const token =
    params.token && typeof params.token === "string" ? params.token : null;

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!token || !process.env.NEXT_PUBLIC_JWT) return;

    const decodedToken = jwt.decode(token, { complete: true }) as any;

    const dateNow = new Date();

    const tokenIsValid =
      decodedToken && decodedToken.payload.exp < dateNow.getTime()
        ? true
        : false;

    const id = tokenIsValid ? decodedToken.payload.user : null;

    if (!id) return;
    const target = event.target as typeof event.target & {
      password: { value: string };
    };

    const data = {
      password: target.password.value,
      id: id,
    };

    axios({
      method: "put",
      url: `/api/auth/newpassword`,
      data,
    }).then(() => router.push("/signin"));
  };

  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <form onSubmit={onSubmit}>
          <h3 className="mt5">Nouveau mot de passe</h3>
          <InputPassword
            label="Mot de passe"
            placeholder="Mot de passe"
            name="password"
            required
            // error={error.status}
          />
          <RegularButton type="submit" style="full" text="VALIDER" />
        </form>
      }
    />
  );
};
export default NewPassword;
