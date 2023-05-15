import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import Login from "src/features/auth/Login";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import MyInfosContainer from "src/features/UserProfile/MyInfosContainer";

const UserProfile = ({ user, uid }: any) => {
  const userToDisplay = user.isLoggedIn
    ? uid === "me"
      ? user.id
      : parseInt(uid as string)
    : null;

  return user.isLoggedIn && uid === "me" ? (
    <MyInfosContainer userConnectedId={user.id} />
  ) : user.isLoggedIn && userToDisplay && user.id ? (
    <UserInfosContainer
      userConnectedId={user.id}
      userToDisplay={userToDisplay}
    />
  ) : (
    <Login />
  );
};
export default UserProfile;

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
  const session = req.session as any;
  const uid = query.uid;
  return {
    props: {
      user: session.user,
      uid,
    },
  };
});
