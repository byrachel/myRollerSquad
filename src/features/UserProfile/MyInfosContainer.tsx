import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";

import UserInfos from "src/features/UserProfile/UserInfos";
import RollerSkateLevel from "src/features/UserProfile/RollerSkateLevel";
import Loader from "@/components/layouts/Loader";
import UserResume from "./UserResume";
import UserBusinessCard from "./UserBusiness/UserBusinessCard";
import BusinessProfileCTA from "../BusinessProfile/BusinessProfileCTA";
import { useProfile } from "src/hooks/useProfile";
import { PlaceInterface } from "src/interfaces/userInterfaces";
import MyInfosMenu from "./MyInfosMenu";

interface Props {
  userConnectedId: number;
}

const MyInfosContainer = ({ userConnectedId }: Props) => {
  const { userProfileLoading, userProfile, userPlaces, getUserProfile } =
    useProfile(
      (state) => ({
        userProfileLoading: state.userProfileLoading,
        userProfile: state.userProfile,
        userPlaces: state.userPlaces,
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
        <div className="mt5">
          <MyInfosMenu userConnectedId={userConnectedId} isMyProfile />

          <UserInfos user={userProfile} userConnectedId={userConnectedId} />
          <UserResume user={userProfile} userConnectedId={userConnectedId} />
          {userPlaces && userPlaces.length > 0 ? (
            userPlaces.map((place: PlaceInterface) => (
              <UserBusinessCard
                key={place.id}
                placeId={place.id}
                userToDisplayId={userConnectedId}
                userConnectedId={userConnectedId}
              />
            ))
          ) : (
            <BusinessProfileCTA />
          )}
          <RollerSkateLevel
            rollerDanceLevel={userProfile.roller_dance_level}
            skateParkLevel={userProfile.skatepark_level}
            artisticLevel={userProfile.artistic_level}
            freestyleLevel={userProfile.freestyle_level}
            urbanLevel={userProfile.urban_level}
            derbyLevel={userProfile.derby_level}
          />
        </div>
      ) : userProfileLoading ? (
        <Loader text="Profil en cours de chargement..." />
      ) : null}
    </>
  );
};
export default MyInfosContainer;
