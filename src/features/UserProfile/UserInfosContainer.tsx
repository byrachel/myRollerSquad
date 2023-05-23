import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import UserInfos from "src/features/UserProfile/UserInfos";
import LastPostsShared from "src/features/UserProfile/LastPostsShared";
import RollerSkateLevel from "src/features/UserProfile/RollerSkateLevel";
import UserProfileReducer from "src/reducers/UserProfileReducer";
import Loader from "src/components/layouts/Loader";
import UserResume from "./UserResume";
import UserBusinessCard from "./UserBusiness/UserBusinessCard";
import BusinessProfileCTA from "../BusinessProfile/BusinessProfileCTA";
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

  console.log(userProfile);

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
            userProfile.user.place.map((elt: number) => (
              <UserBusinessCard
                key={elt}
                placeId={elt}
                userToDisplayId={userProfile.user.id}
                userConnectedId={userConnectedId}
              />
            ))
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
          <div className="userFavsContainer">
            <h2 className="title">Shops & clubs favoris</h2>
            <UserBusinessFavs favs={userProfile.user.favorite_places} />
          </div>
        </>
      ) : userProfile.loading ? (
        <Loader text="Profil en cours de chargement..." />
      ) : null}
    </>
  );
};
export default UserInfosContainer;
