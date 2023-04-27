import React from "react";

import Avatar from "./Avatar/Avatar";
import LogoutButton from "../../components/buttons/LogoutButton";
import UpdateProfileButton from "../../components/buttons/UpdateProfileButton";
import styles from "../../styles/Profile.module.scss";
import BusinessProfileCTA from "../BusinessProfile/BusinessProfileCTA";
import { parseContent } from "src/utils/parseContent";
import { PlaceInterface, UserInterface } from "src/interfaces/userInterfaces";

import Pin from "src/svg/pin.svg";
import Instagram from "src/svg/instagram.svg";
import Tiktok from "src/svg/tiktok.svg";
import Youtube from "src/svg/youtube.svg";
import BusinessCard from "../BusinessProfile/BusinessCard";

interface Props {
  user: UserInterface;
  userProfileDispatch: React.Dispatch<any>;
  userConnectedId: number;
}

export default function UserInfos({
  user,
  userProfileDispatch,
  userConnectedId,
}: Props) {
  const updateUserProfile = () => {
    userProfileDispatch({ type: "UPDATE_USER_PROFILE", payload: true });
  };

  console.log(user);

  return (
    <div className={styles.rollerSkaterInfoBar}>
      <div className={styles.rollerSkaterInfoContainer}>
        <Avatar
          avatar={user.avatar}
          userId={user.id}
          userConnectedId={userConnectedId}
          userProfileDispatch={userProfileDispatch}
        />
        <div className={styles.rollerSkaterInfo}>
          <div className={styles.rollerSkaterName}>
            <h1>{user.name}</h1>
            <div>
              {userConnectedId === user.id ? (
                <>
                  <UpdateProfileButton
                    userProfileDispatch={userProfileDispatch}
                  />
                  <LogoutButton />
                </>
              ) : null}
            </div>
          </div>
          <div className={styles.rollerSkaterLocation}>
            <p>
              <Pin className={styles.locationIcon} width={20} height={20} />
              {user.city ? `${user.city}, ` : null}
              {user.country}
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
          {/* <RegularButton type="button" text="+ MA SQUAD" style="full" /> */}
        </div>
        <div className={styles.rollerSkaterDescription}>
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
          {userConnectedId ? (
            <BusinessProfileCTA userConnectedId={userConnectedId} />
          ) : null}

          {user.place.length > 0
            ? user.place.map((elt: PlaceInterface) => (
                <BusinessCard
                  key={elt.id}
                  place={elt}
                  isOwner={userConnectedId === user.id}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
