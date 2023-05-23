import MyFavs from "src/features/UserBoard/Favs/MyFavs";
import Loader from "src/components/layouts/Loader";
import { useUser } from "src/hooks/useUser";

const UserFavs = () => {
  const userId = useUser((state) => state.userId);

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
