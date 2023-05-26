import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";

import UserInfos from "src/features/UserProfile/UserInfos";
import RollerSkateLevel from "src/features/UserProfile/RollerSkateLevel";
import Loader from "src/components/layouts/Loader";
import UserResume from "./UserResume";
import { useProfile } from "src/hooks/useProfile";

interface Props {
  userConnectedId: number;
}

const MyInfosContainer = ({ userConnectedId }: Props) => {
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

  return (
    <>
      {userProfile ? (
        <>
          <UserInfos user={userProfile} userConnectedId={userConnectedId} />
          <UserResume user={userProfile} userConnectedId={userConnectedId} />
          <RollerSkateLevel
            rollerDanceLevel={userProfile.roller_dance_level}
            skateParkLevel={userProfile.skatepark_level}
            artisticLevel={userProfile.artistic_level}
            freestyleLevel={userProfile.freestyle_level}
            urbanLevel={userProfile.urban_level}
            derbyLevel={userProfile.derby_level}
          />
        </>
      ) : userProfileLoading ? (
        <Loader text="Profil en cours de chargement..." />
      ) : null}
    </>
  );
};
export default MyInfosContainer;
