import { SyntheticEvent, useState } from "react";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import Link from "next/link";

import { onLogin } from "./utils/services";
import { useUser } from "src/hooks/useUser";
import ErrorLayout from "@/components/layouts/ErrorLayout";
import InputText from "@/components/form/InputText";
import InputPassword from "@/components/form/InputPassword";
import Loader from "@/components/layouts/Loader";
import BigButton from "@/components/buttons/BigButton";

import Roller from "src/svg/rollerquad.svg";

export default function LoginForm() {
  const [error, setError] = useState({ status: false, message: "" });
  const { login, userId, isLoading, setIsLoading } = useUser(
    (state: any) => ({
      login: state.login,
      isLoading: state.isLoading,
      setIsLoading: state.setIsLoading,
      userId: state.userId,
    }),
    shallow
  );
  const router = useRouter();

  return (
    <>
      <h3 className="mt5">Se connecter :</h3>
      <div className="lightSeparator mt5" />
      {isLoading && !userId ? (
        <Loader text="Connexion en cours..." />
      ) : (
        <>
          <form
            onSubmit={(e: SyntheticEvent) =>
              onLogin(e, login, setError, setIsLoading, router)
            }
          >
            <ErrorLayout
              error={error.status}
              message={error.message}
              setError={setError}
            />
            <InputText
              label="Identifiant (email)"
              placeholder="email"
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
            <br />
            <p className="meta">
              <Link href="/auth/password/init">Mot de passe oublié ?</Link>
            </p>
            <br />
            <BigButton type="submit" style="outline" text="SE CONNECTER" />
          </form>
          <Link href="/auth/register" className="signinContainer">
            <Roller className="rollerColoredIcon" width={40} height={40} />
            <div className="link">
              <p>Pas encore membre ? Clique ici et crée un compte !</p>
            </div>
          </Link>
        </>
      )}
    </>
  );
}
