import Image from "next/image";
import React from "react";

interface Props {
    urlPict: string
}

export default function PicturesSlider({urlPict}: Props) {
  return (
    <div className="slider">
      <Image
        src={`/img/${urlPict}`}
        alt="Formateur Roller Quad"
        className="sliderPict"
        fill
      />
    </div>
  );
}
