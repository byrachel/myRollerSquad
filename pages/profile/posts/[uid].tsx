import NewPostBar from "client/components/layouts/NewPostBar";
import HandlePosts from "client/features/UserBoard/Posts/HandlePosts";
import Loader from "client/components/layouts/Loader";
import { useUser } from "client/hooks/useUser";

const UserPosts = () => {
  const userId = useUser((state) => state.userId);

  return (
    <>
      <NewPostBar />
      {userId ? (
        <HandlePosts userConnectedId={userId} />
      ) : (
        <Loader text="Génération de toutes tes publications en cours..." />
      )}
    </>
  );
};
export default UserPosts;
