import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import UserInfos from "src/features/UserProfile/UserInfos";
import LastPostsShared from "src/features/UserProfile/LastPostsShared";
import RollerSkateLevel from "src/features/UserProfile/RollerSkateLevel";
import UpdateUserProfile from "src/features/UserProfile/UpdateUserProfile/UpdateUserProfile";
import UserProfileReducer from "src/reducers/UserProfileReducer";
import Loader from "@/components/layouts/Loader";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  user: null,
  updateProfile: false,
  profileUpdated: false,
};

interface Props {
  userConnectedId: number;
  userToDisplay: number;
}

const UserInfosContainer = ({ userConnectedId, userToDisplay }: Props) => {
  const router = useRouter();
  const [userProfile, userProfileDispatch] = useReducer(
    UserProfileReducer,
    initialState
  );

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
            <RollerSkateLevel
              rollerDanceLevel={userProfile.user.roller_dance_level}
              skateParkLevel={userProfile.user.skatepark_level}
              artisticLevel={userProfile.user.artistic_level}
              freestyleLevel={userProfile.user.freestyle_level}
              urbanLevel={userProfile.user.urban_level}
              derbyLevel={userProfile.user.derby_level}
            />
            <LastPostsShared
              posts={userProfile.user.posts}
              userConnectedId={userConnectedId}
            />
          </>
        )
      ) : userProfile.loading ? (
        <Loader text="Profil en cours de chargement..." />
      ) : userProfile.error ? (
        <p>{userProfile.errorMessage}</p>
      ) : null}
    </>
  );
};
export default UserInfosContainer;
