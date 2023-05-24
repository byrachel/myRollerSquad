import { useSession } from "next-auth/react";

import MyFavs from "src/features/UserBoard/Favs/MyFavs";
import Loader from "src/components/layouts/Loader";

const UserFavs = () => {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  return (
    <>
      <div className="coloredSeparator" />
      {userId ? (
        <MyFavs userConnectedId={userId} />
      ) : (
        <Loader text="Tes shops et clubs favoris se chargent..." />
      )}
    </>
  );
};
export default UserFavs;
