import { SyntheticEvent } from "react";

import BigButton from "../buttons/BigButton";

interface Props {
  setDisplayRegisterForm: React.Dispatch<any>;
  isModal: boolean;
}

export default function RegisterForm({
  setDisplayRegisterForm,
  isModal,
}: Props) {
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
      {isModal ? <label>Nom ou pseudonyme</label> : null}
      <input
        type="text"
        placeholder={isModal ? "" : "Nom ou pseudonyme"}
        name="pseudo"
        className={isModal ? "input" : "registerInput"}
        required
        min-length="3"
        max-length="50"
      />
      {isModal ? <label>eMail</label> : null}
      <input
        type="text"
        placeholder={isModal ? "" : "eMail"}
        name="email"
        className={isModal ? "input" : "registerInput"}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        required
      />
      {isModal ? <label>Mot de passe</label> : null}
      <input
        type="text"
        placeholder={isModal ? "" : "Mot de passe"}
        name="password"
        className={isModal ? "input" : "registerInput"}
        pattern={passwordConstraintsRegex}
        required
      />
      <p className="blackMeta mt5">
        Le mot de passe doit contenir au moins 8 caractères, dont une majuscule,
        une minuscule, un chiffre et un caractère spécial.
      </p>
      <BigButton type="submit" style="outline" text="créer un compte" />
    </form>
  );
}
