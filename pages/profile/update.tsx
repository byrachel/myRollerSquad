import React from "react";
import Login from "client/features/auth/Login";
import UpdateUserProfileContainer from "client/features/UserProfile/UpdateUserProfile/UpdateUserProfileContainer";
import { useUser } from "client/hooks/useUser";

export default function UpdateMyAccount() {
  const userId = useUser((state) => state.userId);

  return userId ? (
    <UpdateUserProfileContainer userConnectedId={userId} />
  ) : (
    <Login />
  );
}
