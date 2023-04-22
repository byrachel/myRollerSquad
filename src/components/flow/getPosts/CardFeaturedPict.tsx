import Image from "next/image";
import React, { useState } from "react";

import Right from "src/svg/nav-arrow-right.svg";
import Left from "src/svg/nav-arrow-left.svg";

interface Props {
  urlPicts: string[];
  color: string;
}

export default function CardFeaturedPict({ urlPicts, color }: Props) {
  const [currentPict, setCurrentPict] = useState(0);

  return (
    <>
      <div className="featuredPict">
        <Image
          src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${urlPicts[currentPict]}`}
          alt="Roller Skateur"
          className="pict"
          fill
        />

        {urlPicts.length > 1 ? (
          <>
            <Left
              width="50"
              height="50"
              className={`pictSliderArrow left ${color}`}
              onClick={() =>
                setCurrentPict(
                  currentPict === 0 ? urlPicts.length - 1 : currentPict - 1
                )
              }
            />
            <Right
              width="50"
              height="50"
              className={`pictSliderArrow right ${color}`}
              onClick={() =>
                setCurrentPict(
                  currentPict === urlPicts.length - 1 ? 0 : currentPict + 1
                )
              }
            />
          </>
        ) : null}
      </div>
    </>
  );
}
