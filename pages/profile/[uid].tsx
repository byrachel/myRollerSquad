import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import Login from "@/components/auth/Login";
import { withSessionSsr } from "@/server/middleware/auth/withSession";

const UserProfile = ({ user, uid }: any) => {
  const userToDisplay = user.isLoggedIn
    ? uid === "me"
      ? user.id
      : parseInt(uid as string)
    : null;

  return userToDisplay && user.id ? (
    <UserInfosContainer
      userConnectedId={user.id}
      userToDisplay={userToDisplay}
      userRole={user.role}
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
