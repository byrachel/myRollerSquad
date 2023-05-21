import React from "react";
import Login from "src/features/auth/Login";
import UpdateUserProfileContainer from "src/features/UserProfile/UpdateUserProfile/UpdateUserProfileContainer";
import { useUser } from "src/hooks/useUser";

export default function UpdateMyAccount() {
  const userId = useUser((state) => state.userId);

  return userId ? (
    <UpdateUserProfileContainer userConnectedId={userId} />
  ) : (
    <Login />
  );
}
