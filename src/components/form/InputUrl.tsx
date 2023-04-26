import React from "react";

interface Props {
  value?: string;
  required: boolean;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputUrl({ value, required, error, onChange }: Props) {
  return (
    <div className="inputContainer">
      <div className="spaceBetween">
        <label htmlFor="url">Website :</label>
        {required ? <p className="required">*</p> : null}
      </div>
      <input
        type="url"
        placeholder="https://www.tonSuperSite.com"
        name="url"
        defaultValue={value || ""}
        required={required}
        className={error ? "input error" : "input"}
        onChange={onChange}
      />
    </div>
  );
}
