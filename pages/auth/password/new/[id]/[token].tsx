import React, { SyntheticEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import SidebarLayout from "src/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import RegularButton from "src/components/buttons/RegularButton";
import InputPassword from "src/components/form/InputPassword";
import { checkTokenValidity } from "src/utils/checkTokenValidity";

const NewPassword = () => {
  const router = useRouter();
  const params = router.query;
  const token =
    params.token && typeof params.token === "string" ? params.token : null;

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!token || !process.env.NEXT_PUBLIC_JWT) return;

    const tokenIsValid = checkTokenValidity(token);
    const id = tokenIsValid ? tokenIsValid.payload.user : null;

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
          />
          <RegularButton type="submit" style="full" text="VALIDER" />
        </form>
      }
    />
  );
};
export default NewPassword;
