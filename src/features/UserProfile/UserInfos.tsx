import React from "react";

import Avatar from "./Avatar/Avatar";
import { UserInterface } from "src/interfaces/userInterfaces";

import Pin from "src/svg/pin.svg";

interface Props {
  user: UserInterface;
  userConnectedId: number;
}

export default function UserInfos({ user, userConnectedId }: Props) {
  return (
    <div className="rollerSkaterInfoBar">
      <Avatar
        avatar={user.avatar}
        userId={user.id}
        userConnectedId={userConnectedId}
      />
      <div className="rollerSkaterInfo">
        <h1>{user.name}</h1>
        <p>
          <Pin className="locationIcon" width={20} height={20} />
          {user.city ? `${user.city}, ` : null}
          {user.country}
        </p>
      </div>
    </div>
  );
}
