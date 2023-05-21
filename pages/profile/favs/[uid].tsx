import MyFavs from "src/features/UserBoard/Favs/MyFavs";
import Loader from "@/components/layouts/Loader";
import MyInfosMenu from "src/features/UserProfile/MyInfosMenu";
import { useUser } from "src/hooks/useUser";

const UserFavs = () => {
  const userId = useUser((state) => state.userId);

  return userId ? (
    <div className="mt5">
      <MyInfosMenu userConnectedId={userId} isMyProfile={false} />

      <div className="underliner" />
      <h2 className="center mt5">Mes shops & clubs favoris</h2>
      <MyFavs userConnectedId={userId} />
    </div>
  ) : (
    <Loader text="Tes shops et clubs favoris se chargent..." />
  );
};
export default UserFavs;
