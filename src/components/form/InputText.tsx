import React from "react";

interface Props {
  label?: string;
  placeholder?: string;
  name: string;
  value?: string;
  required: boolean;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
}

export default function InputText({
  label,
  placeholder,
  name,
  value,
  required,
  error,
  onChange,
  minLength,
  maxLength,
}: Props) {
  return (
    <div className="inputContainer">
      <div className="spaceBetween">
        {label ? <label>{label}</label> : ""}
        {label && required ? <p className="required">*</p> : null}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        defaultValue={value || ""}
        required={required}
        className={error ? "input error" : "input"}
        onChange={onChange}
        minLength={minLength || 0}
        maxLength={maxLength || 1000}
      />
    </div>
  );
}
