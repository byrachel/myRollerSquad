import React from "react";
import Login from "src/features/auth/Login";
import UpdateUserProfileContainer from "src/features/UserProfile/UpdateUserProfile/UpdateUserProfileContainer";
import useLoggedUser from "src/hooks/useLoggedUser";

export default function UpdateMyAccount() {
  const { userId } = useLoggedUser();

  return userId ? (
    <UpdateUserProfileContainer userConnectedId={userId} />
  ) : (
    <Login />
  );
}
