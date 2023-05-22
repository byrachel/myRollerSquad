import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  userId: number | null;
  placeId: number | null;
  userAvatar: string | null;
  color: string;
  logo: string | null;
}

export default function Avatar({
  userId,
  userAvatar,
  color,
  logo,
  placeId,
}: Props) {
  return (
    <Link
      href={placeId ? `/business/${placeId}` : `/profile/${userId}`}
      className="avatarContainer"
    >
      <Image
        src={
          logo
            ? `https://myrollerbusinesslogo.s3.eu-west-3.amazonaws.com/${logo}`
            : userAvatar
            ? `https://mys3rollerpicts.s3.eu-west-3.amazonaws.com/${userAvatar}`
            : "/img/myrollersquad_avatar.jpeg"
        }
        alt="Roller Skater Avatar"
        className={`avatar ${color}`}
        width="90"
        height="90"
      />
    </Link>
  );
}
