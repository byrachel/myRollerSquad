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
          // src="/img/avatar_myRollerSquad.jpg"
          src="https://mys3rollerpicts.s3.eu-west-3.amazonaws.com/1679840613112-_2343b71e-e1d0-4da2-be68-d6d9d79104d8.jpeg"
          alt="Roller Quad"
          className={styles.rollerSkaterAvatar}
          width={200}
          height={200}
        />
      )}
      {userId === userConnectedId ? (
        <UploadAvatarButton
          displayNewAvatar={displayNewAvatar}
          setDisplayNewAvatar={setDisplayNewAvatar}
          userProfileDispatch={userProfileDispatch}
        />
      ) : null}
    </div>
  );
}
