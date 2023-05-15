import React from "react";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import { UserStateInterface } from "src/reducers/UserReducer";
import Login from "src/features/auth/Login";
import UpdateUserProfileContainer from "src/features/UserProfile/UpdateUserProfile/UpdateUserProfileContainer";

interface Props {
  user: UserStateInterface;
}

export default function UpdateMyAccount({ user }: Props) {
  return user.isLoggedIn && user.id ? (
    <UpdateUserProfileContainer userConnectedId={user.id} />
  ) : (
    <Login />
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const session = req.session as any;
  return {
    props: {
      user: session.user,
    },
  };
});
