import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import RegularButton from "views/components/buttons/RegularButton";

export default function BusinessProfileCTA() {
  const router = useRouter();
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

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
          <p className="ctaLink">
            Active ton compte "business" & apparaît dans l'annuaire.
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
