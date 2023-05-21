import React from "react";
import { Button } from "@nextui-org/react";
import { useUser } from "src/hooks/useUser";
import { onLogout } from "../auth/utils/services";
import { useRouter } from "next/router";

import LogoutIcon from "src/svg/logout.svg";

interface Props {
  userConnectedId: number;
  isMyProfile: boolean;
}

export default function MyInfosMenu({ userConnectedId, isMyProfile }: Props) {
  const logout = useUser((state) => state.logout);
  const router = useRouter();

  return (
    <div className="spaceBetween">
      <Button.Group color="gradient" ghost>
        {isMyProfile ? (
          <Button onPress={() => router.push(`/profile/update`)}>
            Mettre à jour
          </Button>
        ) : (
          <Button onPress={() => router.push(`/profile/me`)}>Mon compte</Button>
        )}
        <Button
          onPress={() => router.push(`/profile/posts/${userConnectedId}`)}
        >
          Mes Posts
        </Button>
        <Button onPress={() => router.push(`/profile/favs/${userConnectedId}`)}>
          Mes Favoris
        </Button>
      </Button.Group>
      <LogoutIcon
        className="logoutIcon"
        width={32}
        height={32}
        onClick={() => onLogout(logout, router)}
      />
    </div>
  );
}
