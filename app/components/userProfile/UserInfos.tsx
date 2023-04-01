import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Pin from "app/svg/pin.svg";
import Message from "app/svg/mail.svg";
import Instagram from "app/svg/instagram.svg";
import Tiktok from "app/svg/tiktok.svg";
import Youtube from "app/svg/youtube.svg";
import Avatar from "app/svg/add-media-image.svg";
import Logout from "app/svg/logout.svg";

import RegularButton from "@/components/buttons/RegularButton";
import styles from "../../styles/Profile.module.scss";
import Modal from "../layouts/Modal";
import UploadAvatar from "./UploadAvatar";
import { UserInterface } from "app/interfaces/userInterfaces";
import axios from "axios";

interface Props {
  user: UserInterface;
}

export default function UserInfos({ user }: Props) {
  const [displayNewAvatar, setDisplayNewAvatar] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState<any | null>(null);
  const router = useRouter();

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

  const logout = (userId: number) => {
    if (userId) {
      localStorage.removeItem("token");
      axios({
        method: "post",
        url: "/api/logout",
        data: { userId },
        withCredentials: true,
      })
        .then(res => {
          console.log(res);
          router.push("/");
        })
        .catch(err => console.log(err));
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
                src={`https://mys3rollerpicts.s3.eu-west-3.amazonaws.com/${user.avatar}`}
                alt="Roller Skater Avatar"
                className={styles.rollerSkaterAvatar}
                width={200}
                height={200}
              />
            ) : (
              <Image
                // src="/img/avatar_myRollerSquad.jpg"
                src="https://mys3rollerpicts.s3.eu-west-3.amazonaws.com/1679840613112-_2343b71e-e1d0-4da2-be68-d6d9d79104d8.jpeg"
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
            <div className={styles.rollerSkaterName}>
              <h1>{user.name}</h1>
              <Logout
                className={styles.logoutIcon}
                width={28}
                height={28}
                onClick={() => logout(user.id)}
              />
            </div>
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
