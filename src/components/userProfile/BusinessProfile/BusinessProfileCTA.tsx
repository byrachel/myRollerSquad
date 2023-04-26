import React from "react";
import { useRouter } from "next/router";

import RegularButton from "@/components/buttons/RegularButton";

interface Props {
  userConnectedId: number;
}

export default function BusinessProfileCTA({ userConnectedId }: Props) {
  const router = useRouter();
  return (
    <div className="ctaBox">
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
        onClick={() => router.push(`/business/signup/${userConnectedId}`)}
      />
    </div>
  );
}
