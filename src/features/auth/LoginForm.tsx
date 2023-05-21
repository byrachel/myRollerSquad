import { SyntheticEvent, useState } from "react";
import { onLogin } from "./utils/services";
import { useUser } from "src/hooks/useUser";
import RegularButton from "../../components/buttons/RegularButton";
import ErrorLayout from "../../components/layouts/ErrorLayout";
import InputText from "../../components/form/InputText";
import InputPassword from "../../components/form/InputPassword";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [error, setError] = useState({ status: false, message: "" });
  const setUser = useUser((state: any) => state.login);
  const router = useRouter();

  return (
    <form
      onSubmit={(e: SyntheticEvent) => onLogin(e, setUser, setError, router)}
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
      <RegularButton type="submit" style="full" text="SE CONNECTER" />
    </form>
  );
}
