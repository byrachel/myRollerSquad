import { SyntheticEvent, useState } from "react";

import BigButton from "../buttons/BigButton";
import Camera from "app/svg/add-media-image.svg";

interface Props {
  setDisplayRegisterForm: React.Dispatch<any>;
}

export default function RegisterForm({ setDisplayRegisterForm }: Props) {
  const [password, setPassword] = useState<string | null>(null);
  const passwordConstraintsRegex =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$";
  // ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$

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
    <div>
      <form onSubmit={onSubmit}>
        <div className="spaceBetween">
          <div style={{ width: "100%", marginTop: "0.5em" }}>
            <input
              type="text"
              placeholder={"pseudo"}
              name="pseudo"
              className="registerInput"
              required
              min-length="3"
              max-length="50"
            />
          </div>
          <div>
            <label htmlFor="fileInput" className="registerFileInput">
              <Camera className="fileInputIcon" width={40} height={40} />
              <input
                id="fileInput"
                className="input"
                type="file"
                accept="image/*"
                // onChange={e => uploadPictsWithPreview(e, postDispatch)}
              />
            </label>
          </div>
        </div>
        <input
          type="text"
          placeholder={"email"}
          name="email"
          className="registerInput"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />

        <input
          type="text"
          placeholder={"password"}
          name="password"
          className="registerInput"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$"
          required
        />
        <p className="blackMeta">
          Le mot de passe doit contenir au moins 8 caractères, dont une
          majuscule, une minuscule, un chiffre et un caractère spécial.
        </p>
        <BigButton type="submit" style="outline" text="créer un compte" />
      </form>
    </div>
  );
}
