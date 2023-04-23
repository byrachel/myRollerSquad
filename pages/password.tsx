import React from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "src/components/layouts/UnloggedUserSidebar";
import RegularButton from "@/components/buttons/RegularButton";
import InputText from "@/components/form/InputText";
import Link from "next/link";

const Password = () => {
  //   const router = useRouter();

  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <form>
          <div className="spaceBetween">
            <h3 className="mt5">Réinitialiser mot de passe</h3>
            <Link href="/signin">
              <p className="mt5">X</p>
            </Link>
          </div>
          {/* <ErrorLayout
        error={error.status}
        message={error.message}
        setError={setError}
      /> */}
          <InputText
            label="Identifiant (email)"
            placeholder="email"
            name="email"
            required
            //   error={error.status}
          />
          <RegularButton type="submit" style="full" text="VALIDER" />
        </form>
      }
    />
  );
};
export default Password;
