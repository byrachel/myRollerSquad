// import { withSessionSsr } from "@/server/middleware/auth/withSession";
import { useContext } from "react";
import { useRouter } from "next/router";
import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import Login from "@/components/auth/Login";
import { UserContext } from "src/context/UserContext";
// import { UserStateInterface } from "src/reducers/UserReducer";

// interface Props {
//   user: UserStateInterface;
// }

const UserProfile = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { userState } = useContext(UserContext);
  const userToDisplay = uid === "me" ? userState.id : parseInt(uid as string);

  console.log(userToDisplay);

  return userState.isLoggedIn && userState.id && userToDisplay ? (
    <UserInfosContainer
      userConnectedId={userState.id}
      userToDisplay={userToDisplay}
    />
  ) : (
    <Login />
  );
};
export default UserProfile;

// export const getServerSideProps = withSessionSsr(async ({ req }) => {
//   const user = req.session as any;

//   return {
//     props: user,
//   };
// });
