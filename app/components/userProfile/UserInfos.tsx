import React, { useState } from "react";
import Image from "next/image";

import Pin from "../../svg/pin.svg";
import Message from "../../svg/mail.svg";
import Instagram from "../../svg/instagram.svg";
import Tiktok from "../../svg/tiktok.svg";
import Youtube from "../../svg/youtube.svg";
import Avatar from "../../svg/add-media-image.svg";

import RegularButton from "@/components/buttons/RegularButton";
import styles from "../../styles/Profile.module.scss";
import Modal from "../layouts/Modal";
import UploadAvatar from "./UploadAvatar";
import { UserInterface } from "app/interfaces/userInterfaces";

interface Props {
  user: UserInterface;
}

export default function UserInfos({ user }: Props) {
  const [displayNewAvatar, setDisplayNewAvatar] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState<any | null>(null);

  console.log("state", newAvatarFile);

  const newAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    let files = e.target.files;
    let file = files[0] as any;

    if (file.size > 1000000) {
      console.log("file too large");
    } else {
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
    }
  };

  return (
    <>
      <div className={styles.rollerSkaterInfoBar}>
        <div className={styles.rollerSkaterInfoBackground} />
        <div className={styles.rollerSkaterInfoContainer}>
          <div className={styles.rollerSkaterAvatarContainer}>
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="Roller Quad"
                className={styles.rollerSkaterAvatar}
                width={200}
                height={200}
              />
            ) : (
              <Image
                src="/img/avatar_myRollerSquad.jpg"
                alt="Roller Quad"
                className={styles.rollerSkaterAvatar}
                width={200}
                height={200}
              />
            )}

            <label htmlFor="fileInput" className="flowFileInput">
              <Avatar
                className={styles.updateAvatarIcon}
                width={28}
                height={28}
              />
              <input
                id="fileInput"
                className="input"
                type="file"
                accept="image/*"
                multiple
                onChange={newAvatar}
              />
            </label>

            <div className={styles.rollerSkaterLinks}>
              <Message className={styles.linkIcon} width={28} height={28} />
              <Youtube className={styles.linkIcon} width={28} height={28} />
              <Instagram className={styles.linkIcon} width={28} height={28} />
              <Tiktok className={styles.linkIcon} width={28} height={28} />
            </div>
            <div className={styles.profileButton}>
              <RegularButton type="button" text="+ MA SQUAD" style="full" />
            </div>
          </div>
          <div className={styles.rollerSkaterInfo}>
            <h1>{user.name}</h1>
            <div className={styles.rollerSkaterLocation}>
              <p>
                <Pin className={styles.locationIcon} width={20} height={20} />
                Cannes, France
              </p>
            </div>
            <div className={styles.rollerSkaterDescription}>
              <p>dsjbvds jebfezljb jbfzeljf ajzfbeljfb zljfb</p>
              <RegularButton
                type="button"
                text="Modifier mon profil"
                style="outline"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={displayNewAvatar}
        setShow={setDisplayNewAvatar}
        title="Photo de profil"
      >
        <UploadAvatar avatar={newAvatarFile} />
      </Modal>
    </>
  );
}
