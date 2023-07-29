import { useSession } from "next-auth/react";

import NewPostBar from "views/components/layouts/NewPostBar";
import Flow from "views/features/Flow/getPosts/Flow";
import Loader from "views/components/layouts/Loader";

const MyRollerBlog = () => {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  return userId ? (
    <>
      <NewPostBar />
      <Flow userConnectedId={userId} />
    </>
  ) : (
    <Loader text="Chargement des publications en cours..." />
  );
};
export default MyRollerBlog;
