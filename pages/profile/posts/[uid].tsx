import NewPostBar from "src/components/layouts/NewPostBar";
import HandlePosts from "src/features/UserBoard/Posts/HandlePosts";
import Loader from "src/components/layouts/Loader";
import { useUser } from "src/hooks/useUser";

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
