import { Suspense } from "react";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import NewPostBar from "src/components/layouts/NewPostBar";
import Flow from "src/features/Flow/getPosts/Flow";
import Login from "src/features/auth/Login";
import Loader from "@/components/layouts/Loader";

const MyRollerBlog = ({ user }: any) => {
  return (
    <Suspense fallback={<Loader />}>
      {user && user.isLoggedIn && user.id ? (
        <>
          <NewPostBar />
          <Flow userConnectedId={user.id} />
        </>
      ) : (
        <Login />
      )}
    </Suspense>
  );
};
export default MyRollerBlog;

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session as any;

  return {
    props: user,
  };
});
