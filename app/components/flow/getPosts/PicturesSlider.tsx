import Image from "next/image";
import React from "react";

interface Props {
  urlPicts: string[];
}

export default function PicturesSlider({ urlPicts }: Props) {
  const [currentPict, setCurrentPict] = React.useState(0);

  console.log(urlPicts);
  return (
    <div className="slider">
      <Image
        src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${urlPicts[currentPict]}`}
        alt="Roller Skateur"
        className="sliderPict"
        fill
      />
      <button
        onClick={() =>
          setCurrentPict(
            currentPict === 0 ? urlPicts.length - 1 : currentPict - 1
          )
        }
      >
        Previous
      </button>
      <button
        onClick={() =>
          setCurrentPict(
            currentPict === urlPicts.length - 1 ? 0 : currentPict + 1
          )
        }
      >
        Next
      </button>
    </div>
  );
}
