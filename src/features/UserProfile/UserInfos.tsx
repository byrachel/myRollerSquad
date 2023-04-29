import React from "react";

import Avatar from "./Avatar/Avatar";
import LogoutButton from "../../components/buttons/LogoutButton";
import UpdateProfileButton from "../../components/buttons/UpdateProfileButton";
import { UserInterface } from "src/interfaces/userInterfaces";

import Pin from "src/svg/pin.svg";

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
  return (
    <div className="rollerSkaterInfoBar">
      <Avatar
        avatar={user.avatar}
        userId={user.id}
        userConnectedId={userConnectedId}
        userProfileDispatch={userProfileDispatch}
      />
      <div className="rollerSkaterInfo">
        <div className="rollerSkaterName">
          <h1>{user.name}</h1>
          <div className="rollerSkaterButtons">
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
        <div className="rollerSkaterLocation">
          <Pin className="locationIcon" width={20} height={20} />
          <p>
            {user.city ? `${user.city}, ` : null}
            {user.country}
          </p>
        </div>
      </div>
    </div>
  );
}
