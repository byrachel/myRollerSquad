import { useSession } from "next-auth/react";
import HandlePosts from "views/features/UserBoard/Posts/HandlePosts";

const UserPosts = () => {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  return (
    <>
      <div className="coloredSeparator" />
      <p className="meta center mt-large">Mes publications</p>
      <div className="mt5" />
      {userId ? <HandlePosts userConnectedId={userId} /> : null}
    </>
  );
};
export default UserPosts;
