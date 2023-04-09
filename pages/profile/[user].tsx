import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import withAuth from "app/utils/withAuth";
import UserInfos from "@/components/userProfile/UserInfos";
import LastPostsShared from "@/components/userProfile/LastPostsShared";
import RollerSkateLevel from "@/components/userProfile/RollerSkateLevel";
import UpdateUserProfile from "@/components/userProfile/UpdateUserProfile/UpdateUserProfile";
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
        axios(`/api/${user}/userprofile`, {
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
          .catch(() => {
            userProfileDispatch({
              type: "ERROR",
              payload: "Les données ne sont pas accessibles pour le moment.",
            });
          });
      }
    }
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
export default withAuth(UserProfile);
