import React, { useState } from "react";
import UploadAvatar from "./UploadAvatar";
import Modal from "views/components/layouts/Modal";

import Avatar from "views/svg/add-media-image.svg";

interface Props {
  displayNewAvatar: boolean;
  setDisplayNewAvatar: (arg: boolean) => void;
  userId: number;
}

export default function UploadAvatarButton({
  displayNewAvatar,
  setDisplayNewAvatar,
  userId,
}: Props) {
  const [newAvatarFile, setNewAvatarFile] = useState<any | null>(null);

  const newAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setNewAvatarFile({ file, ...imageDimensions });
    setDisplayNewAvatar(true);
  };

  return (
    <>
      <label htmlFor="fileInput" className="flowFileInput">
        <Avatar className="updateAvatarIcon" width={28} height={28} />
        <input
          id="fileInput"
          className="input"
          type="file"
          accept="image/*"
          multiple
          onChange={newAvatar}
        />
      </label>

      <Modal
        show={displayNewAvatar}
        setShow={setDisplayNewAvatar}
        title="Photo de profil"
      >
        <UploadAvatar
          userId={userId}
          avatar={newAvatarFile}
          setDisplayNewAvatar={setDisplayNewAvatar}
        />
      </Modal>
    </>
  );
}
