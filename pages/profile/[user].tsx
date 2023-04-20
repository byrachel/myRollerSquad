import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import UserInfos from "app/components/userProfile/UserInfos";
import LastPostsShared from "app/components/userProfile/LastPostsShared";
import RollerSkateLevel from "app/components/userProfile/RollerSkateLevel";
import UpdateUserProfile from "app/components/userProfile/UpdateUserProfile/UpdateUserProfile";
import UserProfileReducer from "app/reducers/UserProfileReducer";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  user: null,
  updateProfile: false,
  profileUpdated: false,
};

const UserProfile = () => {
  const router = useRouter();
  const { user } = router.query;
  const [userProfile, userProfileDispatch] = useReducer(
    UserProfileReducer,
    initialState
  );

  useEffect(() => {
    if (user) {
      userProfileDispatch({
        type: "LOADING",
      });
      const token = localStorage.getItem("token");
      if (token) {
        axios(`/api/user/${user}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
          .then(res =>
            userProfileDispatch({
              type: "SET_USER",
              payload: res.data.user,
            })
          )
          .catch(() => router.push("/signin"));
      } else {
        router.push("/signin");
      }
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      {userProfile.user ? (
        userProfile.updateProfile ? (
          <UpdateUserProfile
            userProfile={userProfile}
            userProfileDispatch={userProfileDispatch}
          />
        ) : (
          <>
            <UserInfos
              user={userProfile.user}
              userProfileDispatch={userProfileDispatch}
            />
            <RollerSkateLevel
              rollerDanceLevel={userProfile.user.roller_dance_level}
              skateParkLevel={userProfile.user.skatepark_level}
              artisticLevel={userProfile.user.artistic_level}
              freestyleLevel={userProfile.user.freestyle_level}
              urbanLevel={userProfile.user.urban_level}
              derbyLevel={userProfile.user.derby_level}
            />
            <LastPostsShared posts={userProfile.user.posts} />
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
export default UserProfile;
