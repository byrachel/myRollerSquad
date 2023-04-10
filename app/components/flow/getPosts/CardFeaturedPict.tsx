import Image from "next/image";
import React, { useMemo } from "react";

import Camera from "app/svg/add-media-image.svg";
import Modal from "@/components/layouts/Modal";
import PicturesSlider from "./PicturesSlider";

interface Props {
  urlPicts: string[];
  color: string;
}

export default function CardFeaturedPict({ urlPicts, color }: Props) {
  const [showSlider, setShowSlider] = React.useState(false);

  const featuredPict = useMemo(() => urlPicts[0], [urlPicts]);
  const pictCounter = useMemo(() => urlPicts.length, [urlPicts]);

  return (
    <>
      <div className="featuredPict">
        <Image
          src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${featuredPict}`}
          alt="Roller Skateur"
          className="pict"
          fill
        />
        {pictCounter > 1 ? (
          <div
            role="button"
            tabIndex={0}
            className={`pictCounter ${color}`}
            onClick={() => setShowSlider(true)}
            onKeyDown={() => setShowSlider(true)}
          >
            <Camera
              className={`pictCounterIcon ${color}`}
              width={18}
              height={18}
            />
            {pictCounter}
          </div>
        ) : null}
      </div>
      <Modal show={showSlider} setShow={setShowSlider}>
        <PicturesSlider urlPicts={urlPicts} />
      </Modal>
    </>
  );
}
