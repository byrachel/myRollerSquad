import React from "react";

import InputText from "src/components/form/InputText";
import Editor from "@/components/form/Editor/Editor";
import UpdateRollerSkateLevel from "./UpdateRollerSkateLevel";
import SelectLocation from "src/components/form/Location/SelectLocation";

interface Props {
  userDataToUpdate: any;
  dispatchUserDataToUpdate: React.Dispatch<any>;
}

const UpdateUserProfileForm = ({
  userDataToUpdate,
  dispatchUserDataToUpdate,
}: Props) => {
  return (
    <>
      <InputText
        label="Nom (ou pseudo)"
        placeholder="Nom (ou pseudo)"
        name="name"
        value={userDataToUpdate.name}
        required
        error={userDataToUpdate.error}
        minLength={3}
        maxLength={20}
      />

      <SelectLocation
        country={userDataToUpdate.country}
        department={userDataToUpdate.county}
        // city={userDataToUpdate.city}
      />
      <label htmlFor="resume">Bio :</label>
      <Editor
        content={userDataToUpdate.resume}
        dispatchContent={dispatchUserDataToUpdate}
        placeholder="Ta pratique, tes passions, tes engagements... Bref, qui es-tu ?"
      />
      <br />
      <UpdateRollerSkateLevel
        label="Roller Dance"
        type="roller_dance_level"
        currentLevel={userDataToUpdate.level.roller_dance_level}
        dispatchUserDataToUpdate={dispatchUserDataToUpdate}
      />
      <UpdateRollerSkateLevel
        label="Freestyle"
        type="freestyle_level"
        currentLevel={userDataToUpdate.level.freestyle_level}
        dispatchUserDataToUpdate={dispatchUserDataToUpdate}
      />
      <UpdateRollerSkateLevel
        label="SkatePark"
        type="skatepark_level"
        currentLevel={userDataToUpdate.level.skatepark_level}
        dispatchUserDataToUpdate={dispatchUserDataToUpdate}
      />
      <UpdateRollerSkateLevel
        label="Roller Derby"
        type="derby_level"
        currentLevel={userDataToUpdate.level.derby_level}
        dispatchUserDataToUpdate={dispatchUserDataToUpdate}
      />
      <UpdateRollerSkateLevel
        label="Randonnée (urbain)"
        type="urban_level"
        currentLevel={userDataToUpdate.level.urban_level}
        dispatchUserDataToUpdate={dispatchUserDataToUpdate}
      />
      <UpdateRollerSkateLevel
        label="Patinage artistique"
        type="artistic_level"
        currentLevel={userDataToUpdate.level.artistic_level}
        dispatchUserDataToUpdate={dispatchUserDataToUpdate}
      />
      <InputText
        label="Instagram"
        placeholder="Instagram"
        name="instagram"
        value={userDataToUpdate.social_medias?.instagram}
        required={false}
        error={userDataToUpdate.error}
      />
      <InputText
        label="Tiktok"
        placeholder="Tiktok"
        name="tiktok"
        value={userDataToUpdate.social_medias?.tiktok}
        required={false}
        error={userDataToUpdate.error}
      />
      <InputText
        label="Youtube"
        placeholder="Youtube"
        name="youtube"
        value={userDataToUpdate.social_medias?.youtube}
        required={false}
        error={userDataToUpdate.error}
      />
    </>
  );
};
export default UpdateUserProfileForm;
