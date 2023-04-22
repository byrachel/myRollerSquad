import { withSessionSsr } from "@/server/middleware/auth/withSession";
import NewPostBar from "src/components/layouts/NewPostBar";
import Flow from "src/components/flow/getPosts/Flow";
import Login from "@/components/auth/Login";
import { UserStateInterface } from "src/reducers/UserReducer";

interface Props {
  user: UserStateInterface;
}

const MyRollerBlog = ({ user }: Props) => {
  console.log("ROLLER", user);

  return user && user.isLoggedIn && user.id ? (
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
