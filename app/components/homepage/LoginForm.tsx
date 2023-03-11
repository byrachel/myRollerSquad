import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { setAuthState } from "../../store/authSlice";
import RegularButton from "../buttons/RegularButton";
import RegisterForm from "./RegisterForm";

interface Props {
  setShowLoginForm: (arg: boolean) => void;
}

export default function LoginForm({ setShowLoginForm }: Props) {
  const dispatch = useDispatch();
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const data = {
      email: target.email.value,
      password: target.password.value,
    };

    fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      //   credentials: "same-origin",
    })
      .then(res => {
        const token = res.headers.get("authorization");
        if (token) {
          localStorage.setItem("token", token);
        }

        return res.json();
      })
      .then(data => {
        console.log("USER IS LOGGED", data);
        dispatch(setAuthState(true));
        setShowLoginForm(false);
      })
      .catch(err => console.log(err));
  };

  return displayRegisterForm ? (
    <RegisterForm setDisplayRegisterForm={setDisplayRegisterForm} isModal />
  ) : (
    <>
      <form onSubmit={onSubmit}>
        <label>Identifiant (email)</label>
        <input
          type="text"
          placeholder={"email"}
          name="email"
          value="blabla@gmail.com"
          className="input"
        />
        <label>Mot de passe</label>
        <input
          type="text"
          placeholder={"password"}
          name="password"
          value="NEWME2"
          className="input"
        />
        <RegularButton type="submit" style="full" text="SE CONNECTER" />
      </form>
      <div className="lightSeparator mt5" />
      <p
        className="metaCenterText link mt5"
        onClick={() => setDisplayRegisterForm(true)}
        role="button"
      >
        Tu n'as pas de compte ? Crée un compte & partage tes rides !
      </p>
    </>
  );
}
