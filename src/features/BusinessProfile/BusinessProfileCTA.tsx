import React, { useContext } from "react";
import { useRouter } from "next/router";

import RegularButton from "@/components/buttons/RegularButton";
import { UserContext } from "src/context/UserContext";

export default function BusinessProfileCTA() {
  const { userState } = useContext(UserContext);
  const router = useRouter();

  const createBusiness = () => {
    if (userState.id) {
      router.push(`/business/create/${userState.id}`);
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="ctaBox center">
      <div>
        <h3>Tu es un club, une association, un formateur ?</h3>
        <p className="ctaLink">
          Active ton compte <b>business</b> & apparaît dans l'annuaire !
        </p>
      </div>
      <RegularButton
        type="button"
        text="Go !"
        style="outline"
        onClick={createBusiness}
      />
    </div>
  );
}
