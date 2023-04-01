import { SyntheticEvent } from "react";
import { useRouter } from "next/router";

import BigButton from "../buttons/BigButton";
import axios from "axios";

export default function RegisterForm() {
  const router = useRouter();
  const passwordConstraintsRegex =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      pseudo: { value: string };
      email: { value: string };
      password: { value: string };
    };

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
      .catch((err: any) => console.log(err));
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Nom ou pseudonyme</label>
      <input
        type="text"
        name="pseudo"
        className={"input"}
        required
        min-length="3"
        max-length="50"
      />
      <label>eMail</label>
      <input
        type="text"
        name="email"
        className={"input"}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        required
      />
      <label>Mot de passe</label>
      <input
        type="text"
        name="password"
        className={"input"}
        pattern={passwordConstraintsRegex}
        required
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
