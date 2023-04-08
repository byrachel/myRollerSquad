import React, { useContext } from "react";
import axios from "axios";

import RollerStylesbar from "@/components/layouts/RollerStylesBar";
import UserInfos from "@/components/userProfile/UserInfos";
import { UserContext } from "app/context/UserContext";
import { UserProfileInterface } from "app/reducers/UserProfileReducer";

interface Props {
  userProfile: UserProfileInterface;
  userProfileDispatch: React.Dispatch<any>;
}

const UpdateUserProfile = ({ userProfile, userProfileDispatch }: Props) => {
  const { userState } = useContext(UserContext);
  const userConnectedId = userState.user?.id;

  return (
    <>
      {userProfile.user ? (
        <div className="sidebarLayout">
          <div className="sidebarContent">
            <div className="sidebarText">
              <h2>Quoi de beau à partager aujourd'hui ?</h2>
              <ul>
                <li>Un tuto ou une astuce ?</li>
                <li>Votre joli set-up !</li>
                <li>La recherche d'autres pratiquants dans votre région ?</li>
                <li>L'envie d'organiser un RDV au skatepark ?</li>
                <li>...</li>
              </ul>
              <p className="meta">
                myRollerSquad est une communauté active & bienveillante de
                passionnés de roller quad.
              </p>
            </div>
          </div>
          <div className="sidebarContainer">
            <p>test</p>
          </div>
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
