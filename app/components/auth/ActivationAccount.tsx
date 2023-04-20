import React, { useState } from "react";

import BigButton from "@/components/buttons/BigButton";
import ErrorLayout from "../layouts/ErrorLayout";
import { sendActivationMail } from "./utils/services";

interface Props {
  id: number | null;
}

const ActivationAccount = ({ id }: Props) => {
  const [error, setError] = useState({ status: false, message: "" });
  const [activationEmailSent, setActivationEmailSent] = useState(false);

  return activationEmailSent ? (
    <>
      <h2>Check ta boite mail !</h2>
      <p className="mt5">
        N'oublie pas de vérifier tes spams (ou courriers indésirables).
      </p>
    </>
  ) : (
    <>
      <h2>Oups ! Le lien n'est plus valide.</h2>
      <ErrorLayout
        error={error.status}
        message={error.message}
        setError={setError}
      />
      <p className="mt5">
        Cliquez sur le bouton ci-dessous pour recevoir un nouveau lien
        d'activation. Attention, il ne sera valide qu'une heure après sa
        création.
      </p>
      <BigButton
        type="button"
        onClick={() => sendActivationMail(id, setError, setActivationEmailSent)}
        style="outline"
        text="Activer mon compte"
      />
    </>
  );
};
export default ActivationAccount;
