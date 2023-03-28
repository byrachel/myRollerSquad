import Image from "next/image";
import React from "react";

interface Props {
  urlPicts: string[];
}

export default function PicturesSlider({ urlPicts }: Props) {
  console.log(urlPicts);
  return (
    <div className="slider">
      {urlPicts.map(urlPict => (
        <Image
          src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${urlPict}`}
          alt="Roller Skateur"
          className="sliderPict"
          fill
        />
      ))}
    </div>
  );
}
