import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useProfile } from "src/hooks/useProfile";
import UserBusinessFavs from "./UserBusinessFavs";

interface Props {
  userConnectedId: number;
}

export default function MyFavs({ userConnectedId }: Props) {
  const { userFavs, getUserFavs } = useProfile(
    (state) => ({
      userFavs: state.userFavs,
      getUserFavs: state.getUserFavs,
    }),
    shallow
  );

  useEffect(() => {
    getUserFavs(userConnectedId);
    // eslint-disable-next-line
  }, [userConnectedId]);

  return <UserBusinessFavs favs={userFavs} fromMyProfile={true} />;
}
