import Loader from "@/components/layouts/Loader";
import NewPostBar from "src/components/layouts/NewPostBar";
import Flow from "src/features/Flow/getPosts/Flow";
import { useUser } from "src/hooks/useUser";

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
