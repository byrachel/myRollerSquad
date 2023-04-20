import { useState } from "react";

import { onRegister } from "./utils/services";
import BigButton from "../buttons/BigButton";
import ErrorLayout from "../layouts/ErrorLayout";
import InputText from "../form/InputText";
import InputMail from "../form/InputMail";
import InputPassword from "../form/InputPassword";

export default function RegisterForm() {
  const [error, setError] = useState({ status: false, message: "" });
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <form onSubmit={e => onRegister(e, setError, setIsRegistered)}>
      {error ? (
        <ErrorLayout
          error={error.status}
          message={error.message}
          setError={setError}
        />
      ) : null}
      {isRegistered ? (
        <div className="mt5">
          <h2>Bienvenue dans la Roller Squad !</h2>
          <p className="mt5">
            Votre compte a bien été créé. Vous allez recevoir un eMail de
            confirmation. Par sécurité, vous devez cliquer sur le lien contenu
            dans cet eMail pour activer votre compte et vous connecter.
          </p>
          <p>
            <b>
              Ne tardez pas, ce lien n'est valable que 1h après sa création.
            </b>
          </p>
        </div>
      ) : (
        <>
          <InputText
            label="Nom ou pseudonyme"
            placeholder="Nom ou pseudonyme"
            name="pseudo"
            required
            error={error.status}
            minLength={3}
            maxLength={20}
          />
          <InputMail
            label="eMail"
            placeholder="eMail"
            name="email"
            required
            error={error.status}
          />
          <InputPassword
            label="Mot de passe"
            placeholder="Mot de passe"
            name="password"
            required
            error={error.status}
          />
          <p className="blackMeta mt5">
            Le mot de passe doit contenir au moins 8 caractères, dont une
            majuscule, une minuscule, un chiffre et un caractère spécial.
          </p>
          <br />
          <BigButton type="submit" style="outline" text="créer un compte" />
        </>
      )}
    </form>
  );
}
