import React from "react";
import { useRouter } from "next/router";
import { State, useStore } from "src/hooks/useStore";

import RegularButton from "@/components/buttons/RegularButton";

export default function BusinessProfileCTA() {
  const router = useRouter();
  const userId = useStore((state: State) => state.userId);

  const createBusiness = () => {
    if (userId) {
      router.push(`/business/create/${userId}`);
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
