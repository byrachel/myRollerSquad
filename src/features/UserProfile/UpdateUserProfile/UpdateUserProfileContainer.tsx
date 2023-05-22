import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import Loader from "src/components/layouts/Loader";
import { useProfile } from "src/hooks/useProfile";
import UpdateUserProfile from "./UpdateUserProfile";

interface Props {
  userConnectedId: number;
}

export default function UpdateUserProfileContainer({ userConnectedId }: Props) {
  const { userProfileLoading, userProfile, getUserProfile } = useProfile(
    (state) => ({
      userProfileLoading: state.userProfileLoading,
      userProfile: state.userProfile,
      getUserProfile: state.getUserProfile,
    }),
    shallow
  );

  useEffect(() => {
    if (userConnectedId && !userProfile) {
      getUserProfile(userConnectedId);
    }
    // eslint-disable-next-line
  }, [userConnectedId, userProfile]);

  if (userProfileLoading) return <Loader />;

  return userProfile ? <UpdateUserProfile userProfile={userProfile} /> : null;
}
