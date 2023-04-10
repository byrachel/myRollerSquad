import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";

import BigButton from "../buttons/BigButton";
import axios from "axios";
import ErrorLayout from "../layouts/ErrorLayout";
import InputText from "../form/InputText";
import InputMail from "../form/InputMail";
import InputPassword from "../form/InputPassword";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState({ status: false, message: "" });

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setError({ status: false, message: "" });

    const target = event.target as typeof event.target & {
      pseudo: { value: string };
      email: { value: string };
      password: { value: string };
    };

    if (target.pseudo.value.length < 3 || target.pseudo.value.length > 20) {
      return setError({
        status: true,
        message: "Le pseudo doit faire entre 3 et 20 caractères",
      });
    }

    const data = {
      name: target.pseudo.value,
      email: target.email.value,
      password: target.password.value,
    };

    axios({
      method: "post",
      url: "/api/register",
      data,
    })
      .then((res: any) => {
        const token = res.headers["authorization"];
        console.log(token);
        if (token) {
          localStorage.setItem("token", token);
        }
        router.push("/signin");
      })
      .catch((err: any) => {
        console.log(err);
        setError({ status: true, message: err.response.data.message });
      });
  };

  return (
    <form onSubmit={onSubmit}>
      {error ? (
        <ErrorLayout
          error={error.status}
          message={error.message}
          setError={setError}
        />
      ) : null}
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
        Le mot de passe doit contenir au moins 8 caractères, dont une majuscule,
        une minuscule, un chiffre et un caractère spécial.
      </p>
      <br />
      <BigButton type="submit" style="outline" text="créer un compte" />
    </form>
  );
}
