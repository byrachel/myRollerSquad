import { SyntheticEvent, useState } from "react";

interface Props {
  label: string;
  placeholder: string;
  error: boolean;
}

export default function TextInput({ label, placeholder, error }: Props) {
  return (
    <>
      <div style={{ width: "100%" }}>
        <label htmlFor={label}>{label}</label>
        <input
          className={error ? "input error" : "input"}
          name={label}
          id={label}
          type="text"
          required
          min-length="3"
          max-length="50"
          placeholder={placeholder}
        />
      </div>
    </>
    // <input
    //   type="text"
    //   placeholder={"pseudo"}
    //   name="pseudo"
    //   className="registerInput"
    //   required
    //   min-length="3"
    //   max-length="50"
    // />
  );
}
