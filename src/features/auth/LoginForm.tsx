import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

// import { onLogin } from "./utils/services";
import ErrorLayout from "@/components/layouts/ErrorLayout";
import InputText from "@/components/form/InputText";
import InputPassword from "@/components/form/InputPassword";
import BigButton from "@/components/buttons/BigButton";

import Roller from "src/svg/rollerquad.svg";
import RegularButton from "@/components/buttons/RegularButton";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState({ status: false, message: "" });

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
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const userLogged = (await signIn("credentials", {
      email: target.email.value,
      password: target.password.value,
      callbackUrl: `http://localhost:3000/myrollerblog`,
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
        <>
          <p className="meta mt-large">
            Tu es déjà connecté, sous l'identifiant :
          </p>
          <h3>{userName}</h3>
          <p> Si ce n'est pas ton compte, déconnecte-toi et reconnecte-toi.</p>
          <RegularButton
            text="Me déconnecter"
            type="button"
            style="full"
            onClick={() => signOut()}
          />
        </>
      ) : (
        <>
          <form
            onSubmit={(e: SyntheticEvent) =>
              // onLogin(e, login, setError, setIsLoading, router)
              handleLogin(e)
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
