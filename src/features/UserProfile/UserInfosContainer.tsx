import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import UserInfos from "src/features/UserProfile/UserInfos";
import LastPostsShared from "src/features/UserProfile/LastPostsShared";
import RollerSkateLevel from "src/features/UserProfile/RollerSkateLevel";
import UpdateUserProfile from "src/features/UserProfile/UpdateUserProfile/UpdateUserProfile";
import UserProfileReducer from "src/reducers/UserProfileReducer";
import Loader from "@/components/layouts/Loader";
import UserResume from "./UserResume";
import UserBusinessCard from "./UserBusiness/UserBusinessCard";
import BusinessProfileCTA from "../BusinessProfile/BusinessProfileCTA";
import UserBusinessFavs from "./UserBusinessFavs";

const initialState = {
  loading: false,
  error: false,
  user: null,
  updateProfile: false,
  profileUpdated: false,
  lastPosts: [],
};

interface Props {
  userConnectedId: number;
  userToDisplay: number;
  userRole: string;
}

const UserInfosContainer = ({
  userConnectedId,
  userToDisplay,
  userRole,
}: Props) => {
  const router = useRouter();
  const [userProfile, userProfileDispatch] = useReducer(
    UserProfileReducer,
    initialState
  );

  console.log(userRole);

  useEffect(() => {
    if (userToDisplay) {
      userProfileDispatch({
        type: "LOADING",
      });
      axios(`/api/user/${userToDisplay}`, {
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          userProfileDispatch({
            type: "SET_USER",
            payload: res.data.user,
          });
        })
        .catch(() => {
          router.push("/signin");
        });
    }
    // eslint-disable-next-line
  }, [userToDisplay]);

  return (
    <>
      {userProfile.user ? (
        userProfile.updateProfile ? (
          <>
            <div className="coloredSeparator" />
            <UpdateUserProfile
              userProfile={userProfile}
              userProfileDispatch={userProfileDispatch}
            />
          </>
        ) : (
          <>
            <UserInfos
              user={userProfile.user}
              userProfileDispatch={userProfileDispatch}
              userConnectedId={userConnectedId}
            />
            <UserResume
              user={userProfile.user}
              userProfileDispatch={userProfileDispatch}
              userConnectedId={userConnectedId}
            />
            {userProfile.user.place.length > 0 ? (
              userProfile.user.place.map((elt: number) => (
                <UserBusinessCard
                  key={elt}
                  placeId={elt}
                  userToDisplayId={userProfile.user.id}
                  userConnectedId={userConnectedId}
                />
              ))
            ) : (
              <div style={{ margin: "2em" }}>
                <BusinessProfileCTA />
              </div>
            )}
            <RollerSkateLevel
              rollerDanceLevel={userProfile.user.roller_dance_level}
              skateParkLevel={userProfile.user.skatepark_level}
              artisticLevel={userProfile.user.artistic_level}
              freestyleLevel={userProfile.user.freestyle_level}
              urbanLevel={userProfile.user.urban_level}
              derbyLevel={userProfile.user.derby_level}
            />
            <LastPostsShared
              userToDisplay={userToDisplay}
              userConnectedId={userConnectedId}
              userProfileDispatch={userProfileDispatch}
              posts={userProfile.lastPosts}
            />
            <UserBusinessFavs favs={userProfile.user.favorite_places} />
          </>
        )
      ) : userProfile.loading ? (
        <Loader text="Profil en cours de chargement..." />
      ) : null}
    </>
  );
};
export default UserInfosContainer;
