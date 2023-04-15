import React, { useState } from "react";

import UploadAvatar from "./UploadAvatar";
import Modal from "app/components/layouts/Modal";
import styles from "app/styles/Profile.module.scss";

import Avatar from "app/svg/add-media-image.svg";

interface Props {
  displayNewAvatar: boolean;
  setDisplayNewAvatar: (arg: boolean) => void;
  userProfileDispatch: React.Dispatch<any>;
}

export default function UploadAvatarButton({
  displayNewAvatar,
  setDisplayNewAvatar,
  userProfileDispatch,
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
      await new Promise(resolve => {
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
        <Avatar className={styles.updateAvatarIcon} width={28} height={28} />
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
          avatar={newAvatarFile}
          setDisplayNewAvatar={setDisplayNewAvatar}
          userProfileDispatch={userProfileDispatch}
        />
      </Modal>
    </>
  );
}