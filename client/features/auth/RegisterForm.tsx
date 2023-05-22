import { SyntheticEvent, useReducer } from "react";

import BigButton from "../../components/buttons/BigButton";
import ErrorLayout from "../../components/layouts/ErrorLayout";
import InputText from "../../components/form/InputText";
import InputMail from "../../components/form/InputMail";
import InputPassword from "../../components/form/InputPassword";
import { onRegister } from "./utils/services";
import { RegisterReducer, authInitialState } from "client/reducers/AuthReducer";
import Loader from "../../components/layouts/Loader";

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
      {registerStore.loading ? <Loader text={"Un peu de patience..."} /> : null}
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
          <p className="blackMeta mt5">
            Pour la sécurité de votre compte, le mot de passe doit contenir au
            moins 12 caractères (dont au moins une majuscule, une minuscule et
            un chiffre).
          </p>
          <br />
          <BigButton type="submit" style="outline" text="Créer un compte" />
        </>
      )}
    </form>
  );
}
