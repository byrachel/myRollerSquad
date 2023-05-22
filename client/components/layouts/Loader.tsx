import React from "react";

interface Props {
  text?: string;
}

export default function Loader({ text }: Props) {
  return (
    <div className="center mt-large">
      <div className="loader" />
      {text ? <p className="meta mt-large">{text}</p> : null}
    </div>
  );
}
