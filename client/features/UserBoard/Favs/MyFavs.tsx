import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import axios from "axios";
import UserBusinessFavs from "./UserBusinessFavs";
import { useProfile } from "client/hooks/useProfile";

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
    axios
      .get(`/api/user/favs/${userConnectedId}`)
      .then((res) => getUserFavs(res.data.userFavs));
    // .catch(() => getUserFavs([]));
    // eslint-disable-next-line
  }, [userConnectedId]);

  return <UserBusinessFavs favs={userFavs} />;
}
