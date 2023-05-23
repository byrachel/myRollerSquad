import React from "react";
import { useRouter } from "next/router";
import { State, useUser } from "src/hooks/useUser";

import FavPlace from "src/svg/bookmark-circle.svg";
import RegularButton from "src/components/buttons/RegularButton";

export default function BusinessProfileCTA() {
  const router = useRouter();
  const userId = useUser((state: State) => state.userId);

  const createBusiness = () => {
    if (userId) {
      router.push(`/business/create/${userId}`);
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <div className="ctaBox">
      <div>
        <p className="meta">Tu es un club, une association, un formateur ?</p>
        <div className="socialIconContainer">
          <FavPlace className="pinkIcon" width={32} height={32} />
          <p className="ctaLink">
            Active ton compte "business" et apparaît dans l'annuaire.
          </p>
        </div>
      </div>
      <RegularButton
        type="button"
        text="Créer un compte business"
        style="outline"
        onClick={createBusiness}
      />
    </div>
  );
}
