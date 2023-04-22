import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import UserInfos from "src/components/userProfile/UserInfos";
import LastPostsShared from "src/components/userProfile/LastPostsShared";
import RollerSkateLevel from "src/components/userProfile/RollerSkateLevel";
import UpdateUserProfile from "src/components/userProfile/UpdateUserProfile/UpdateUserProfile";
import UserProfileReducer from "src/reducers/UserProfileReducer";

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
    if (!userToDisplay) return;
    userProfileDispatch({
      type: "LOADING",
    });
    axios(`/api/user/${userToDisplay}`, {
      method: "GET",
      withCredentials: true,
    })
      .then(res =>
        userProfileDispatch({
          type: "SET_USER",
          payload: res.data.user,
        })
      )
      .catch(() => router.push("/signin"));
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
        <div className="loader" />
      ) : userProfile.error ? (
        <p>{userProfile.errorMessage}</p>
      ) : null}
    </>
  );
};
export default UserInfosContainer;
