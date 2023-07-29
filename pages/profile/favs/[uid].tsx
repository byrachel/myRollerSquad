import { useSession } from "next-auth/react";

import MyFavs from "views/features/UserBoard/Favs/MyFavs";
import Loader from "views/components/layouts/Loader";

const UserFavs = () => {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  return (
    <>
      <div className="coloredSeparator" />
      <p className="meta center mt-large">Mes shops & clubs favoris</p>
      <div className="metaUnderliner" />
      {userId ? (
        <MyFavs userConnectedId={userId} />
      ) : (
        <Loader text="Tes shops et clubs favoris se chargent..." />
      )}
    </>
  );
};
export default UserFavs;
