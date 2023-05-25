import React, { useState } from "react";
import Image from "next/image";
import Modal from "src/components/layouts/Modal";
import UploadLogo from "./UploadLogo";

interface Props {
  placeDispatch: React.Dispatch<any>;
  placeId: number;
  placeLogo: string;
  userId: number;
}

export default function UserBusinessLogo({
  placeDispatch,
  placeId,
  placeLogo,
  userId,
}: Props) {
  const [newLogoFile, setNewLogoFile] = useState<any | null>(null);
  const [displayNewLogo, setDisplayNewLogo] = useState(false);

  const newLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const files = e.target.files;
    const file = files[0] as any;

    file["preview"] = URL.createObjectURL(file);

    const image: HTMLImageElement = new window.Image();

    const imageDimensions: { width: number; height: number } =
      await new Promise((resolve) => {
        image.onload = () => {
          const dimensions = {
            height: image.height,
            width: image.width,
          };
          resolve(dimensions);
        };
        image.src = file["preview"];
      });

    setNewLogoFile({ file, ...imageDimensions });
    setDisplayNewLogo(true);
  };

  return (
    <>
      <label htmlFor="logoInput" className="flowFileInput">
        <Image
          src={
            placeLogo
              ? `https://myrollerbusinesslogo.s3.eu-west-3.amazonaws.com/${placeLogo}`
              : "/img/myrollersquad_avatar.jpeg"
          }
          alt="Club de Roller Quad"
          className="businessLogoToUpdate"
          width={140}
          height={140}
        />
        <input
          id="logoInput"
          className="input"
          type="file"
          accept="image/*"
          multiple
          onChange={newLogo}
        />
      </label>

      <Modal show={displayNewLogo} setShow={setDisplayNewLogo} title="Logo">
        <UploadLogo
          placeId={placeId}
          logo={newLogoFile}
          setDisplayNewLogo={setDisplayNewLogo}
          placeDispatch={placeDispatch}
          userId={userId}
        />
      </Modal>
    </>
  );
}
