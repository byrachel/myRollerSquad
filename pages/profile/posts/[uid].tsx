import NewPostBar from "@/components/layouts/NewPostBar";
import Login from "@/components/auth/Login";
import HandlePosts from "src/features/UserBoard/Posts/HandlePosts";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import { UserStateInterface } from "src/reducers/UserReducer";

interface Props {
  user: UserStateInterface;
  uid: string;
}

const UserPosts = ({ user, uid }: Props) => {
  const userId = parseInt(uid);

  return user.isLoggedIn && user.id && user.id === userId ? (
    <>
      <NewPostBar />
      <HandlePosts userConnectedId={user.id} isPro={user.role === "PRO"} />
    </>
  ) : (
    <Login />
  );
};
export default UserPosts;

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
