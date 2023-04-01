import Image from "next/image";
import React from "react";

interface Props {
  urlPicts: string[];
}

export default function PicturesSlider({ urlPicts }: Props) {
  const [currentPict, setCurrentPict] = React.useState(0);

  console.log(urlPicts);
  return (
    <div className="pictSlider">
      <Image
        src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${urlPicts[currentPict]}`}
        alt="Roller Skateur"
        className="pict"
        fill
      />
      {/* <ArrowRight
        className={"pictSliderArrowRight"}
        width={24}
        height={24}
        onClick={setCurrentPict(
          currentPict === 0 ? urlPicts.length - 1 : currentPict - 1
        )}
      />
      <ArrowRight
        className={"pictSliderArrowLeft"}
        width={24}
        height={24}
        onClick={setCurrentPict(
          currentPict === urlPicts.length - 1 ? 0 : currentPict + 1
        )}
      /> */}

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
