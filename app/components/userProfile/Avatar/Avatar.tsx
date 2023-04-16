import React, { useState } from "react";
import Image from "next/image";

import UploadAvatarButton from "./UploadAvatarButton";
import styles from "app/styles/Profile.module.scss";

interface Props {
  avatar: string | null;
  userId: number;
  userConnectedId?: number;
  userProfileDispatch: React.Dispatch<any>;
}

export default function Avatar({
  avatar,
  userId,
  userConnectedId,
  userProfileDispatch,
}: Props) {
  const [displayNewAvatar, setDisplayNewAvatar] = useState(false);

  return (
    <div className={styles.rollerSkaterAvatarContainer}>
      {avatar ? (
        <Image
          src={`https://mys3rollerpicts.s3.eu-west-3.amazonaws.com/${avatar}`}
          alt="Roller Skater Avatar"
          className={styles.rollerSkaterAvatar}
          width={200}
          height={200}
        />
      ) : (
        <Image
          src="/img/myrollersquad_avatar.jpeg"
          alt="My Roller Squad"
          className={styles.rollerSkaterAvatar}
          width={200}
          height={200}
        />
      )}
      {userId === userConnectedId ? (
        <UploadAvatarButton
          userId={userId}
          displayNewAvatar={displayNewAvatar}
          setDisplayNewAvatar={setDisplayNewAvatar}
          userProfileDispatch={userProfileDispatch}
        />
      ) : null}
    </div>
  );
}
