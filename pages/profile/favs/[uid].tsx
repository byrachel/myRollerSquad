import MyFavs from "client/features/UserBoard/Favs/MyFavs";
import Loader from "client/components/layouts/Loader";
import { useUser } from "client/hooks/useUser";

const UserFavs = () => {
  const userId = useUser((state) => state.userId);

  return (
    <>
      <div className="coloredSeparator" />
      {userId ? (
        <div className="mt-large">
          <h2 className="center mt5">Mes shops & clubs favoris</h2>
          <div className="underliner" />
          <MyFavs userConnectedId={userId} />
        </div>
      ) : (
        <Loader text="Tes shops et clubs favoris se chargent..." />
      )}
    </>
  );
};
export default UserFavs;
