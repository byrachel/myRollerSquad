import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  userId: number;
  userAvatar: string | null;
}

export default function Avatar({ userId, userAvatar }: Props) {
  return (
    <Link href={`/profile/${userId}`} className="avatarContainer">
      <Image
        src={
          userAvatar
            ? `https://mys3rollerpicts.s3.eu-west-3.amazonaws.com/${userAvatar}`
            : "/img/myrollersquad_avatar.jpeg"
        }
        alt="Formateur Roller Quad"
        className="avatar"
        width="90"
        height="90"
      />
    </Link>
  );
}
