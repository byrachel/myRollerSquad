import React, { useContext, SyntheticEvent } from "react";

import { UserContext } from "app/context/UserContext";
import { UserProfileInterface } from "app/reducers/UserProfileReducer";
import Avatar from "../Avatar";
import UpdateUserProfileForm from "./UpdateUserProfileForm";
import style from "app/styles/Profile.module.scss";
import RegularButton from "@/components/buttons/RegularButton";
import axios from "axios";

interface Props {
  userProfile: UserProfileInterface;
  userProfileDispatch: React.Dispatch<any>;
}

const UpdateUserProfile = ({ userProfile, userProfileDispatch }: Props) => {
  const { userState } = useContext(UserContext);
  const userConnectedId = userState.user?.id;

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      instagram: { value: string };
      tiktok: { value: string };
      youtube: { value: string };
    };

    const data = {
      name: target.name.value,
      resume: userProfile.user.resume,
      social_medias: {
        instagram: target.instagram.value,
        tiktok: target.tiktok.value,
        youtube: target.youtube.value,
      },
      roller_dance_level: userProfile.user.roller_dance_level,
      skatepark_level: userProfile.user.skatepark_level,
      urban_level: userProfile.user.urban_level,
      freestyle_level: userProfile.user.freestyle_level,
      derby_level: userProfile.user.derby_level,
      artistic_level: userProfile.user.artistic_level,
    };

    const token = localStorage.getItem("token");

    console.log(data);
    axios({
      method: "put",
      url: `/api/userprofile/update/${userConnectedId}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(response => {
        //handle success
        console.log("OK", response);
      })
      .catch(response => {
        //handle error
        console.log("err", response);
      });
  };

  return (
    <>
      {userProfile.user ? (
        <div className="sidebarLayout">
          <div className="sidebarContent">
            <div className={style.updateUserSidebarAvatar}>
              <Avatar
                avatar={userProfile.user.avatar}
                userId={userProfile.user.id}
                userConnectedId={userConnectedId}
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
              userProfile={userProfile}
              userProfileDispatch={userProfileDispatch}
            />
            <RegularButton type="submit" style="full" text="ENREGISTRER" />
          </form>
        </div>
      ) : userProfile.loading ? (
        <div className="loader" />
      ) : userProfile.error ? (
        <p>{userProfile.errorMessage}</p>
      ) : null}
    </>
  );
};
export default UpdateUserProfile;
