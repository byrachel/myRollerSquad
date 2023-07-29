import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import ErrorLayout from "views/components/layouts/ErrorLayout";
import InputText from "views/components/form/InputText";
import InputPassword from "views/components/form/InputPassword";
import BigButton from "views/components/buttons/BigButton";
import AlreadyLogged from "./AlreadyLogged";
import Loader from "views/components/layouts/Loader";

import Roller from "views/svg/rollerquad.svg";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession() as any;
  const userName = session?.user?.username;

  interface LoginInterface {
    error: string | null;
    url: string | null;
    ok: boolean;
    status: number;
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const userLogged = (await signIn("credentials", {
      email: target.email.value,
      password: target.password.value,
      callbackUrl: `/myrollerblog`,
      redirect: false,
    })) as LoginInterface;
    if (userLogged?.error) console.log("ERROR", userLogged.error);
    if (userLogged?.url) router.push(userLogged.url);
  };

  return (
    <>
      <h2 className="mt5">Se connecter :</h2>
      <div className="lightSeparator mt5" />
      {userName ? (
        <AlreadyLogged userName={userName} />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={(e: SyntheticEvent) => handleLogin(e)}>
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
