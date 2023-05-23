import React from "react";
import LoginForm from "src/features/auth/LoginForm";
import UpdateUserProfileContainer from "src/features/UserProfile/UpdateUserProfile/UpdateUserProfileContainer";
import { useUser } from "src/hooks/useUser";

export default function UpdateMyAccount() {
  const userId = useUser((state) => state.userId);

  return userId ? (
    <UpdateUserProfileContainer userConnectedId={userId} />
  ) : (
    <LoginForm />
  );
}
