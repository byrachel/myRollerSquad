import { SyntheticEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "app/context/UserContext";
import RegularButton from "../buttons/RegularButton";
import axios from "axios";
import ErrorLayout from "../layouts/ErrorLayout";
import InputText from "../form/InputText";
import InputPassword from "../form/InputPassword";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState({ status: false, message: "" });
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
      url: `/api/auth/login`,
      data,
    })
      .then((res: any) => {
        const token = res.headers["authorization"];
        const user = res.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("id", JSON.stringify(user.id));
        localStorage.setItem("role", JSON.stringify(user.role));
        userDispatch({
          type: "LOGIN",
          payload: { id: user.id, role: user.role },
        });
        router.push("/flow");
      })
      .catch((err: any) => {
        console.log(err);
        setError({ status: true, message: err });
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
      <RegularButton type="submit" style="full" text="SE CONNECTER" />
    </form>
  );
}
