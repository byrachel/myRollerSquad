import { SyntheticEvent } from "react";
import { useRouter } from "next/router";
import RegularButton from "../buttons/RegularButton";

export default function LoginForm() {
  const router = useRouter();

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
        value="test@token.com"
        className="input"
      />

      <label>Mot de passe</label>
      <input
        type="text"
        placeholder={"password"}
        name="password"
        value="m0tDeP@sse"
        className="input"
      />
      <RegularButton type="submit" style="full" text="SE CONNECTER" />
    </form>
  );
}
