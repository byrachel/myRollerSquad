import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import RegularButton from "../buttons/RegularButton";

export default function LoginForm() {
  const router = useRouter();
  const [displayPassword, setDisplayPassword] = useState(false);

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
        router.push("/flow");
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Identifiant (email)</label>
      <input
        type="text"
        placeholder={"email"}
        name="email"
        defaultValue="byrachel@gmail.com"
        className="input"
      />

      <label onClick={() => setDisplayPassword(prevState => !prevState)}>
        Mot de passe
      </label>
      <input
        type={displayPassword ? "text" : "password"}
        placeholder={"password"}
        name="password"
        defaultValue="test"
        className="input"
      />
      <RegularButton type="submit" style="full" text="SE CONNECTER" />
    </form>
  );
}
