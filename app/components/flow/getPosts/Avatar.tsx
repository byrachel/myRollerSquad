import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  userId: number;
}

export default function Avatar({ userId }: Props) {
  return (
    <Link href={`/profile/${userId}`} className="avatarContainer">
      <Image
        src="/img/pexels-airam-datoon-rollerskater.jpg"
        alt="Formateur Roller Quad"
        className="avatar"
        width="90"
        height="90"
      />
    </Link>
  );
}
