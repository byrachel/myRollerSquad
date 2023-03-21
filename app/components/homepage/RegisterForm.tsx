import { SyntheticEvent } from "react";

import BigButton from "../buttons/BigButton";

interface Props {
  setDisplayRegisterForm: React.Dispatch<any>;
}

export default function RegisterForm({ setDisplayRegisterForm }: Props) {
  const passwordConstraintsRegex =
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,20}$";

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

    fetch(`/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => {
        const token = res.headers.get("authorization");
        if (token) {
          localStorage.setItem("token", token);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setDisplayRegisterForm(false);
      })
      .catch(err => console.log(err));
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
