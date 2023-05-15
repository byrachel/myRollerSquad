import React, { SyntheticEvent, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Avatar from "../Avatar/Avatar";
import UpdateUserProfileForm from "./UpdateUserProfileForm";
import RegularButton from "src/components/buttons/RegularButton";
import { useProfile } from "src/hooks/useProfile";
import { UserInterface } from "src/interfaces/userInterfaces";

interface Props {
  userProfile: UserInterface;
}

const UpdateUserProfile = ({ userProfile }: Props) => {
  const router = useRouter();

  const initialState = {
    name: userProfile.name,
    country: userProfile.country,
    county: userProfile.county,
    city: userProfile.city,
    resume: userProfile.resume,
    social_medias: {
      instagram: userProfile.social_medias?.instagram ?? "",
      tiktok: userProfile.social_medias?.tiktok ?? "",
      youtube: userProfile.social_medias?.youtube ?? "",
    },
    level: {
      roller_dance_level: userProfile.roller_dance_level,
      derby_level: userProfile.derby_level,
      freestyle_level: userProfile.freestyle_level,
      artistic_level: userProfile.artistic_level,
      skatepark_level: userProfile.skatepark_level,
      urban_level: userProfile.urban_level,
    },
  };

  const updateUserReducer = (state: any, action: any) => {
    switch (action.type) {
      case "SAVE_CONTENT":
        return {
          ...state,
          resume: action.payload,
        };
      case "UPDATE_USER_ROLLER_SKATE_LEVEL":
        return {
          ...state,
          level: {
            ...state.level,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };

  const [userDataToUpdate, dispatchUserDataToUpdate] = useReducer(
    updateUserReducer,
    initialState
  );

  const { updateUserProfile } = useProfile((state) => ({
    updateUserProfile: state.updateUserProfile,
  }));

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      instagram: { value: string };
      tiktok: { value: string };
      youtube: { value: string };
      country: { value: string };
      department: { value: string };
      city: { value: string };
    };

    const data = {
      name: target.name.value,
      country: target.country.value,
      county: target.department.value,
      city: target.city.value,
      resume: userDataToUpdate.resume,
      social_medias: {
        instagram: target.instagram.value,
        tiktok: target.tiktok.value,
        youtube: target.youtube.value,
      },
      roller_dance_level: userDataToUpdate.level.roller_dance_level,
      skatepark_level: userDataToUpdate.level.skatepark_level,
      urban_level: userDataToUpdate.level.urban_level,
      freestyle_level: userDataToUpdate.level.freestyle_level,
      derby_level: userDataToUpdate.level.derby_level,
      artistic_level: userDataToUpdate.level.artistic_level,
    };

    if (userProfile.id) {
      axios({
        method: "put",
        url: `/api/user/update/${userProfile.id}`,
        data,
        withCredentials: true,
      })
        .then((res) => {
          updateUserProfile(res.data.user);
          router.push(`/profile/me`);
        })
        .catch((err) => {
          //handle error
          console.log("err", err);
        });
    } else {
      router.push("/signin");
    }
  };

  return (
    <>
      {userProfile ? (
        <div className="sidebarLayout">
          <div className="sidebarContent">
            <div className="updateUserSidebarAvatar">
              <Avatar
                avatar={userProfile.avatar}
                userId={userProfile.id}
                userConnectedId={userProfile.id}
              />
            </div>
            <div className="sidebarText">
              <p className="meta">
                myRollerSquad est une communauté active & bienveillante de
                passionnés de roller quad.
              </p>
              <p className="meta">
                Merci de respecter les règles de bonne conduite.
              </p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="sidebarContainer">
            <UpdateUserProfileForm
              userDataToUpdate={userDataToUpdate}
              dispatchUserDataToUpdate={dispatchUserDataToUpdate}
            />
            <RegularButton type="submit" style="full" text="ENREGISTRER" />
          </form>
        </div>
      ) : // ) : userProfile.loading ? (
      //   <Loader
      //     text={"Hop! On enregistre tout ça... Encore un petit instant..."}
      //   />
      // ) : userProfile.error ? (
      //   <p>Oups !</p>
      null}
    </>
  );
};
export default UpdateUserProfile;
