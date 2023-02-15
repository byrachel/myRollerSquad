import Image from "next/image";
import React from "react";

export default function Avatar() {
  return (
    <div className="avatar">
      <Image
        src="/img/pexels-airam-datoon-rollerskater.jpg"
        alt="Formateur Roller Quad"
        style={{ borderRadius: "50%" }}
        fill
      />
    </div>
  );
}
