import React from "react";

import { UserProfileInterface } from "src/reducers/UserProfileReducer";
import InputText from "src/components/form/InputText";
import Editor from "@/components/form/Editor/Editor";
import UpdateRollerSkateLevel from "./UpdateRollerSkateLevel";
import UpdateUserCountry from "./UpdateUserCountry";

interface Props {
  userProfile: UserProfileInterface;
  userProfileDispatch: React.Dispatch<any>;
}

const UpdateUserProfileForm = ({ userProfile, userProfileDispatch }: Props) => {
  const user = userProfile.user;

  return (
    <>
      <InputText
        label="Nom (ou pseudo)"
        placeholder="Nom (ou pseudo)"
        name="name"
        value={user.name}
        required
        error={userProfile.error}
        minLength={3}
        maxLength={20}
      />
      <UpdateUserCountry country={user.country} city={user.city} />
      <label htmlFor="resume">Bio :</label>
      <Editor
        content={user.resume}
        dispatchContent={userProfileDispatch}
        placeholder="Ta pratique, tes passions, tes engagements... Bref, qui es-tu ?"
      />
      <br />
      <UpdateRollerSkateLevel
        label="Roller Dance"
        type="roller_dance_level"
        currentLevel={user.roller_dance_level}
        userProfileDispatch={userProfileDispatch}
      />
      <UpdateRollerSkateLevel
        label="Freestyle"
        type="freestyle_level"
        currentLevel={user.freestyle_level}
        userProfileDispatch={userProfileDispatch}
      />
      <UpdateRollerSkateLevel
        label="SkatePark"
        type="skatepark_level"
        currentLevel={user.skatepark_level}
        userProfileDispatch={userProfileDispatch}
      />
      <UpdateRollerSkateLevel
        label="Roller Derby"
        type="derby_level"
        currentLevel={user.derby_level}
        userProfileDispatch={userProfileDispatch}
      />
      <UpdateRollerSkateLevel
        label="Randonnée (urbain)"
        type="urban_level"
        currentLevel={user.urban_level}
        userProfileDispatch={userProfileDispatch}
      />
      <UpdateRollerSkateLevel
        label="Patinage artistique"
        type="artistic_level"
        currentLevel={user.artistic_level}
        userProfileDispatch={userProfileDispatch}
      />
      <InputText
        label="Instagram"
        placeholder="Instagram"
        name="instagram"
        value={user.social_medias?.instagram}
        required={false}
        error={userProfile.error}
      />
      <InputText
        label="Tiktok"
        placeholder="Tiktok"
        name="tiktok"
        value={user.social_medias?.tiktok}
        required={false}
        error={userProfile.error}
      />
      <InputText
        label="Youtube"
        placeholder="Youtube"
        name="youtube"
        value={user.social_medias?.youtube}
        required={false}
        error={userProfile.error}
      />
    </>
  );
};
export default UpdateUserProfileForm;
