import React from "react";
import Avatar from "src/features/UserProfile/Avatar/Avatar";

interface Props {
  avatar: string | null;
  id: number;
}

export default function UpdateUserSidebar({ avatar, id }: Props) {
  return (
    <>
      <div className="updateUserSidebarAvatar">
        <Avatar avatar={avatar} userId={id} userConnectedId={id} />
      </div>
      <div className="sidebarText">
        <p className="meta">
          myRollerSquad est une communauté active & bienveillante de passionnés
          de roller quad.
        </p>
        <p className="meta mt5">
          Merci de respecter les règles de bonne conduite.
        </p>
      </div>
    </>
  );
}
