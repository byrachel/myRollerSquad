import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import RegularButton from "@/components/buttons/RegularButton";
import styles from "../../styles/Profile.module.scss";
import { UserContext } from "app/context/UserContext";
import { UserInterface } from "app/interfaces/userInterfaces";

import Pin from "app/svg/pin.svg";
import Logout from "app/svg/logout.svg";
import Edit from "app/svg/edit.svg";
import Instagram from "app/svg/instagram.svg";
import Tiktok from "app/svg/tiktok.svg";
import Youtube from "app/svg/youtube.svg";
import UploadAvatarButton from "./UploadAvatarButton";

interface Props {
  user: UserInterface;
}

export default function UserInfos({ user }: Props) {
  const router = useRouter();
  const [displayNewAvatar, setDisplayNewAvatar] = useState(false);
  const { userState } = useContext(UserContext);
  const userConnectedId = userState.user?.id;

  const logout = (userId: number) => {
    const token = localStorage.getItem("token");
    if (userId) {
      axios({
        method: "post",
        url: "/api/logout",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(() => {
          localStorage.removeItem("token");
          router.push("/");
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className={styles.rollerSkaterInfoBar}>
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
          {user.id === userConnectedId ? (
            <UploadAvatarButton
              displayNewAvatar={displayNewAvatar}
              setDisplayNewAvatar={setDisplayNewAvatar}
            />
          ) : null}
        </div>
        <div className={styles.rollerSkaterInfo}>
          <div className={styles.rollerSkaterName}>
            <h1>{user.name}</h1>
            <div>
              {userConnectedId === user.id ? (
                <Edit
                  className={styles.editIcon}
                  width={30}
                  height={30}
                  onClick={() => router.push("/updateaccount")}
                />
              ) : null}
              <Logout
                className={styles.logoutIcon}
                width={30}
                height={30}
                onClick={() => logout(user.id)}
              />
            </div>
          </div>
          <div className={styles.rollerSkaterLocation}>
            <p>
              <Pin className={styles.locationIcon} width={20} height={20} />
              Cannes, France
            </p>
          </div>
          <div className={styles.rollerSkaterLinks}>
            <Youtube
              className={
                user.social_medias && user.social_medias.youtube
                  ? styles.linkIcon
                  : styles.noLinkIcon
              }
              width={35}
              height={35}
            />
            <Instagram
              className={
                user.social_medias && user.social_medias.instagram
                  ? styles.linkIcon
                  : styles.noLinkIcon
              }
              width={35}
              height={35}
            />
            <Tiktok
              className={
                user.social_medias && user.social_medias.tiktok
                  ? styles.linkIcon
                  : styles.noLinkIcon
              }
              width={35}
              height={35}
            />
          </div>
        </div>
      </div>
      <div className={styles.rollerSkaterResume}>
        <div className={styles.profileButton}>
          <RegularButton type="button" text="+ MA SQUAD" style="full" />
        </div>
        <div className={styles.rollerSkaterDescription}>
          {user.resume ? (
            <p>{user.resume}</p>
          ) : (
            <div>
              <p className="meta">Aucune information pour le moment...</p>
              {user.id === userConnectedId ? (
                <p
                  role="button"
                  className="textLink"
                  onClick={() => router.push("/updateaccount")}
                >
                  Mettre à jour mon profil
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
