import { Suspense } from "react";
import NewPostBar from "src/components/layouts/NewPostBar";
import Flow from "src/features/Flow/getPosts/Flow";
import Login from "src/features/auth/Login";
import Loader from "@/components/layouts/Loader";
import useLoggedUser from "src/hooks/useLoggedUser";

const MyRollerBlog = () => {
  const { userId } = useLoggedUser();

  return (
    <>
      {userId ? (
        <Suspense fallback={<Loader />}>
          <NewPostBar />
          <Flow userConnectedId={userId} />
        </Suspense>
      ) : (
        <Login />
      )}
    </>
  );
};
export default MyRollerBlog;
