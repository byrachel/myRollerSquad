import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";

import UserInfos from "src/features/UserProfile/UserInfos";
import RollerSkateLevel from "src/features/UserProfile/RollerSkateLevel";
import Loader from "src/components/layouts/Loader";
import UserResume from "./UserResume";
import UserBusinessCard from "./UserBusiness/UserBusinessCard";
import BusinessProfileCTA from "../BusinessProfile/BusinessProfileCTA";
import { useProfile } from "src/hooks/useProfile";
import { PlaceInterface } from "src/entities/business.entity";

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
          {userPlaces && userPlaces.length > 0 ? (
            <>
              <p className="meta center mt-large">Mon espace business</p>
              {userPlaces.map((place: PlaceInterface) => (
                <UserBusinessCard
                  key={place.id}
                  placeId={place.id}
                  userToDisplayId={userConnectedId}
                  userConnectedId={userConnectedId}
                />
              ))}
            </>
          ) : (
            <BusinessProfileCTA />
          )}
        </>
      ) : userProfileLoading ? (
        <Loader text="Profil en cours de chargement..." />
      ) : null}
    </>
  );
};
export default MyInfosContainer;
