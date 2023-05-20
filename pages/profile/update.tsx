import React from "react";
// import { withSessionSsr } from "@/server/middleware/auth/withSession";
// import { UserStateInterface } from "src/reducers/UserReducer";
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

// export const getServerSideProps = withSessionSsr(async ({ req }) => {
//   const session = req.session as any;
//   return {
//     props: {
//       user: session.user,
//     },
//   };
// });
