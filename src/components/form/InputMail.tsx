import React from "react";

interface Props {
  label?: string;
  placeholder?: string;
  name: string;
  value?: string;
  required: boolean;
  error?: boolean;
}

export default function InputMail({
  label,
  placeholder,
  name,
  value,
  required,
  error,
}: Props) {
  return (
    <div className="inputContainer">
      <div className="spaceBetween">
        {label ? <label>{label}</label> : ""}
        {required ? <p className="required">*</p> : null}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        defaultValue={value || ""}
        required={required}
        className={error ? "input error" : "input"}
        pattern="^[a-zA-Z0-9!#$%&amp;'*+\/=?^_`\{\|\}~.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*$"
      />
    </div>
  );
}
