import React, { useEffect } from "react";
import UserBusinessFavs from "../UserBoard/Favs/UserBusinessFavs";
import { useProfile } from "src/hooks/useProfile";
import { shallow } from "zustand/shallow";
import axios from "axios";

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
    if (!userFavs) {
      axios
        .get(`/api/user/favs/${userConnectedId}`)
        .then((res) => getUserFavs(res.data.userFavs));
    }
    // eslint-disable-next-line
  }, [userFavs, userConnectedId]);

  return <UserBusinessFavs favs={userFavs} />;
}
