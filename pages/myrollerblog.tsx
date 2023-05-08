import NewPostBar from "src/components/layouts/NewPostBar";
import Flow from "src/features/Flow/getPosts/Flow";
import Login from "@/components/auth/Login";
import { withSessionSsr } from "@/server/middleware/auth/withSession";

const MyRollerBlog = ({ user }: any) => {
  return user.isLoggedIn && user.id ? (
    <>
      <NewPostBar />
      <Flow userConnectedId={user.id} />
    </>
  ) : (
    <Login />
  );
};
export default MyRollerBlog;

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session as any;

  return {
    props: user,
  };
});
