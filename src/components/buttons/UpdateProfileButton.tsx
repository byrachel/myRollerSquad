import React from "react";
import Edit from "src/svg/edit.svg";

interface Props {
  userProfileDispatch: React.Dispatch<any>;
}

export default function UpdateProfileButton({ userProfileDispatch }: Props) {
  const updateUserProfile = () => {
    userProfileDispatch({ type: "UPDATE_USER_PROFILE", payload: true });
  };

  return (
    <Edit
      className="editIcon"
      width={30}
      height={30}
      onClick={updateUserProfile}
    />
  );
}
