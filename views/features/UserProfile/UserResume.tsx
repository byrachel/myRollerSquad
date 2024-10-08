import React from "react";

import { parseContent } from "views/utils/parseContent";
import { UserInterface } from "models/entities/user.entity";

import Instagram from "views/svg/instagram.svg";
import Tiktok from "views/svg/tiktok.svg";
import Youtube from "views/svg/youtube.svg";
import Link from "next/link";
import RegularButton from "views/components/buttons/RegularButton";

interface Props {
  user: UserInterface;
  userConnectedId: number;
}

export default function UserResume({ user, userConnectedId }: Props) {
  return (
    <div className="rollerSkaterResumeBox">
      <div className="rollerSkaterLinks">
        <Youtube
          className={
            user.social_medias && user.social_medias.youtube
              ? "linkIcon"
              : "noLinkIcon"
          }
          width={35}
          height={35}
        />
        <Instagram
          className={
            user.social_medias && user.social_medias.instagram
              ? "linkIcon"
              : "noLinkIcon"
          }
          width={35}
          height={35}
        />
        <Tiktok
          className={
            user.social_medias && user.social_medias.tiktok
              ? "linkIcon"
              : "noLinkIcon"
          }
          width={35}
          height={35}
        />
      </div>
      <div className="rollerSkaterResume">
        {user.resume ? (
          parseContent(user.resume)
        ) : (
          <p className="meta">Aucune information pour le moment...</p>
        )}
        <br />
        {user.id === userConnectedId ? (
          <Link href="/profile/update">
            <RegularButton
              type="button"
              style="full"
              text="Mettre à jour mon profil"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
