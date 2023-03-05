import Image from "next/image";
import { SyntheticEvent } from "react";

import styles from "../../styles/Home.module.scss";
import AddEventToFav from "../buttons/AddEventToFav";
import GoTo from "../buttons/GoTo";

export default function Login() {
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      //   pseudo: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const data = {
      //   name: target.pseudo.value,
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
        console.log(res.headers.get("authorization"));
        const token = res.headers.get("authorization");
        if (token) {
          localStorage.setItem("token", token);
        }
        return res.json();
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  const getMyProfile = () => {
    const token = localStorage.getItem("token");
    console.log(token);

    fetch(`/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "same-origin",
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* <input type="text" placeholder={"Pseudo"} name="pseudo" /> */}
        <input
          type="text"
          placeholder={"email"}
          name="email"
          value="blabla@gmail.com"
        />
        <input
          type="text"
          placeholder={"password"}
          name="password"
          value="NEWME2"
        />
        <button type="submit">Se connecter</button>
      </form>
      <button type="button" onClick={getMyProfile}>
        MY PROFILE
      </button>
    </div>
  );
}
