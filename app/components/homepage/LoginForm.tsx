import { SyntheticEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "app/context/UserContext";
import RegularButton from "../buttons/RegularButton";
import axios from "axios";

export default function LoginForm() {
  const router = useRouter();
  const [displayPassword, setDisplayPassword] = useState(false);
  const { userDispatch } = useContext(UserContext);

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

    axios({
      method: "post",
      url: "/api/login",
      data,
    })
      .then((res: any) => {
        const token = res.headers["authorization"];
        const user = res.data.user;
        if (token) {
          localStorage.setItem("token", token);
        }
        userDispatch({
          type: "LOGIN",
          payload: { user: { name: user.name, id: user.id, role: user.role } },
        });
        router.push("/flow");
      })
      .catch((err: any) => console.log(err));
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
