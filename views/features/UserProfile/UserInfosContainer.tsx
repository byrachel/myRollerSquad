import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import UserInfos from "views/features/UserProfile/UserInfos";
import LastPostsShared from "views/features/UserProfile/LastPostsShared";
import RollerSkateLevel from "views/features/UserProfile/RollerSkateLevel";
import UserProfileReducer from "views/reducers/UserProfileReducer";
import Loader from "views/components/layouts/Loader";
import UserResume from "./UserResume";
import UserBusinessCard from "./UserBusiness/UserBusinessCard";
import BusinessProfileCTA from "../Business/BusinessProfileCTA";
import UserBusinessFavs from "../UserBoard/Favs/UserBusinessFavs";

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
          router.push("/auth/signin");
        });
    }
    // eslint-disable-next-line
  }, [userToDisplay]);

  return (
    <>
      {userProfile.user ? (
        <>
          <UserInfos
            user={userProfile.user}
            userConnectedId={userConnectedId}
          />
          <UserResume
            user={userProfile.user}
            userConnectedId={userConnectedId}
          />
          {userProfile.user.place.length > 0 ? (
            <>
              <p className="meta pv5 mt5">Son petit business :</p>

              {userProfile.user.place.map((elt: number) => (
                <UserBusinessCard
                  key={elt}
                  placeId={elt}
                  userToDisplayId={userProfile.user.id}
                  userConnectedId={userConnectedId}
                />
              ))}
            </>
          ) : (
            <BusinessProfileCTA />
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
            userConnectedId={userConnectedId}
            posts={userProfile.user.posts}
          />
          <UserBusinessFavs
            favs={userProfile.user.favorite_places}
            fromMyProfile={false}
          />
        </>
      ) : userProfile.loading ? (
        <Loader text="Profil en cours de chargement..." />
      ) : null}
    </>
  );
};
export default UserInfosContainer;
