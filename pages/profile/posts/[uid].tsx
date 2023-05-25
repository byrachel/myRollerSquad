import { useSession } from "next-auth/react";
import NewPostBar from "src/components/layouts/NewPostBar";
import HandlePosts from "src/features/UserBoard/Posts/HandlePosts";
import Loader from "src/components/layouts/Loader";

const UserPosts = () => {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

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
