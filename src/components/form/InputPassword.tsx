import React, { useReducer } from "react";

import Eye from "src/svg/eye.svg";
import EyeOff from "src/svg/eyeoff.svg";

interface Props {
  label?: string;
  placeholder?: string;
  name: string;
  value?: string;
  required: boolean;
  error?: boolean;
}

export default function InputPassword({
  label,
  placeholder,
  name,
  value,
  required,
  error,
}: Props) {
  const [displayPassword, setDisplayPassword] = useReducer((state: boolean) => {
    return !state;
  }, false);

  return (
    <div className="inputContainer">
      <div className="spaceBetween">
        {label ? <label>{label}</label> : ""}
        {required ? <p className="required">*</p> : null}
      </div>
      <input
        type={displayPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        defaultValue={value || ""}
        required={required}
        className={error ? "input error" : "input"}
        pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{12,}$"
      />
      {displayPassword ? (
        <Eye
          className="displayPassword"
          onClick={setDisplayPassword}
          width={20}
          height={20}
          stroke="black"
        />
      ) : (
        <EyeOff
          className="displayPassword"
          onClick={setDisplayPassword}
          width={20}
          height={20}
          stroke="black"
        />
      )}
    </div>
  );
}
