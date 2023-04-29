import React from "react";

import BusinessProfileCTA from "../BusinessProfile/BusinessProfileCTA";
import BusinessCard from "../BusinessProfile/BusinessCard";
import { parseContent } from "src/utils/parseContent";
import { PlaceInterface, UserInterface } from "src/interfaces/userInterfaces";

import Instagram from "src/svg/instagram.svg";
import Tiktok from "src/svg/tiktok.svg";
import Youtube from "src/svg/youtube.svg";

interface Props {
  user: UserInterface;
  userProfileDispatch: React.Dispatch<any>;
  userConnectedId: number;
}

export default function UserResume({
  user,
  userProfileDispatch,
  userConnectedId,
}: Props) {
  const updateUserProfile = () => {
    userProfileDispatch({ type: "UPDATE_USER_PROFILE", payload: true });
  };

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
          <div>
            <p className="meta">Aucune information pour le moment...</p>
            {user.id === userConnectedId ? (
              <div
                role="button"
                tabIndex={0}
                onKeyDown={updateUserProfile}
                onClick={updateUserProfile}
              >
                <p className="textLink">Mettre à jour mon profil</p>
              </div>
            ) : null}
          </div>
        )}

        {user.place.length > 0 ? (
          <>
            {user.place.map((elt: PlaceInterface) => (
              <BusinessCard
                key={elt.id}
                place={elt}
                isOwner={userConnectedId === user.id}
                userConnectedId={userConnectedId}
              />
            ))}
          </>
        ) : userConnectedId === user.id ? (
          <BusinessProfileCTA userConnectedId={userConnectedId} />
        ) : null}
      </div>
    </div>
  );
}
