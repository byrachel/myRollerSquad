import React from "react";
import { useRouter } from "next/router";

import RegularButton from "../buttons/RegularButton";

export default function UnloggedUser() {
  const router = useRouter();
  return (
    <div>
      <h3 className="mt5">
        Oups ! Tu n'as pas accès à ce contenu. Es-tu toujours connecté ?
      </h3>
      <RegularButton
        type="button"
        style="full"
        text="Me connecter"
        onClick={() => router.push("/auth/signin")}
      />
    </div>
  );
}
