import React from "react";
import Image from "next/image";

import Pin from "../../svg/pin.svg";
import Message from "../../svg/mail.svg";
import Instagram from "../../svg/instagram.svg";
import Tiktok from "../../svg/tiktok.svg";
import Youtube from "../../svg/youtube.svg";
import Avatar from "../../svg/add-media-image.svg";

import RegularButton from "@/components/buttons/RegularButton";
import styles from "../../styles/Profile.module.scss";

interface Props {
  myProfile: any;
}

export default function UserInfos({ myProfile }: Props) {
  console.log(myProfile);
  return (
    <div className={styles.rollerSkaterInfoBar}>
      <div className={styles.rollerSkaterInfoBackground} />
      <div className={styles.rollerSkaterInfoContainer}>
        <div className={styles.rollerSkaterAvatarContainer}>
          <Image
            src="/img/avatar_myRollerSquad.jpg"
            alt="Formateur Roller Quad"
            className={styles.rollerSkaterAvatar}
            width={200}
            height={200}
          />
          <Avatar className={styles.updateAvatarIcon} width={28} height={28} />
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
          <h1>DanyOnWheels</h1>
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
  );
}
