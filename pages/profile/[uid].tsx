import { useRouter } from "next/router";
import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import Login from "@/components/auth/Login";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import { UserStateInterface } from "src/reducers/UserReducer";

interface Props {
  user: UserStateInterface;
}

const UserProfile = ({ user }: Props) => {
  const router = useRouter();
  const { uid } = router.query;
  const userToDisplay =
    user && user.isLoggedIn
      ? uid === "me"
        ? user.id
        : parseInt(uid as string)
      : null;

  return userToDisplay && user.id ? (
    <UserInfosContainer
      userConnectedId={user.id}
      userToDisplay={userToDisplay}
    />
  ) : (
    <Login />
  );
};
export default UserProfile;

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session as any;

  return {
    props: user,
  };
});
