import Loader from "client/components/layouts/Loader";
import NewPostBar from "client/components/layouts/NewPostBar";
import Flow from "client/features/Flow/getPosts/Flow";
import { useUser } from "client/hooks/useUser";

const MyRollerBlog = () => {
  const userId = useUser((state) => state.userId);
  return userId ? (
    <>
      <NewPostBar />
      <Flow userConnectedId={userId} />
    </>
  ) : (
    <Loader text="Publications en cours de chargement..." />
  );
};
export default MyRollerBlog;
