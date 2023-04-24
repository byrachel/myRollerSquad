import { SyntheticEvent, useReducer } from "react";

import BigButton from "../buttons/BigButton";
import ErrorLayout from "../layouts/ErrorLayout";
import InputText from "../form/InputText";
import InputMail from "../form/InputMail";
import InputPassword from "../form/InputPassword";
import LoadingPage from "pages/loading";
import { onRegister } from "./utils/services";
import { RegisterReducer, authInitialState } from "src/reducers/AuthReducer";

export default function RegisterForm() {
  const [registerStore, registerDispatch] = useReducer(
    RegisterReducer,
    authInitialState
  );

  return (
    <form onSubmit={(e: SyntheticEvent) => onRegister(e, registerDispatch)}>
      <ErrorLayout
        error={registerStore.error.status}
        message={registerStore.error.message}
        dispatchError={registerDispatch}
      />
      {registerStore.loading ? (
        <div className="mt-large">
          <LoadingPage />
        </div>
      ) : null}
      {registerStore.isRegistered ? (
        <div className="mt-large">
          <h2>Bienvenue dans la Roller Squad !</h2>
          <p className="mt5">
            Votre compte a bien été créé. Vous allez recevoir un eMail de
            confirmation. Par sécurité,{" "}
            <b>
              vous devez cliquer sur le lien contenu dans cet eMail pour activer
              votre compte
            </b>{" "}
            et vous connecter.
          </p>
          <p className="mt5">
            Ne tardez pas, ce lien n'est valable qu'une heure.
          </p>
          <p className="mt5">A très vite :-)</p>
        </div>
      ) : (
        <>
          <InputText
            label="Nom ou pseudonyme"
            placeholder="Nom ou pseudonyme"
            name="pseudo"
            required
            minLength={3}
            maxLength={20}
          />
          <InputMail label="eMail" placeholder="eMail" name="email" required />
          <InputPassword
            label="Mot de passe"
            placeholder="Mot de passe"
            name="password"
            required
          />
          <p className="blackMeta mt-large">
            Pour la sécurité de votre compte, le mot de passe doit contenir au
            moins 12 caractères (dont au moins une majuscule, une minuscule et
            un chiffre).
          </p>
          <br />
          <BigButton type="submit" style="outline" text="créer un compte" />
        </>
      )}
    </form>
  );
}
