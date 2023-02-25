import Image from "next/image";
import React from "react";

export default function Avatar() {
  return (
    <div className="avatarContainer">
      <Image
        src="/img/pexels-airam-datoon-rollerskater.jpg"
        alt="Formateur Roller Quad"
        className="avatar"
        width="90"
        height="90"
      />
    </div>
  );
}
