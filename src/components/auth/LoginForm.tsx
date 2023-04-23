import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "src/context/UserContext";
import { onLogin } from "./utils/services";
import RegularButton from "../buttons/RegularButton";
import ErrorLayout from "../layouts/ErrorLayout";
import InputText from "../form/InputText";
import InputPassword from "../form/InputPassword";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState({ status: false, message: "" });
  const { userDispatch } = useContext(UserContext);

  return (
    <form onSubmit={e => onLogin(e, userDispatch, router, setError)}>
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
        <Link href="/password">Mot de passe oublié ?</Link>
      </p>
      <RegularButton type="submit" style="full" text="SE CONNECTER" />
    </form>
  );
}
