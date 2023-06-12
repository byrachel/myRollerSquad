import React from "react";
import { signOut } from "next-auth/react";

import RegularButton from "@/components/buttons/RegularButton";

interface Props {
  userName: string;
}

export default function AlreadyLogged({ userName }: Props) {
  return (
    <div>
      <p className="meta mt-large">Tu es connecté, sous l'identifiant :</p>
      <h3>{userName}</h3>
      <p> Si ce n'est pas ton compte, déconnecte-toi et reconnecte-toi.</p>
      <RegularButton
        text="Me déconnecter"
        type="button"
        style="full"
        onClick={() => signOut()}
      />
    </div>
  );
}
