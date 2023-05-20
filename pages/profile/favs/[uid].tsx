import Login from "src/features/auth/Login";
import MyFavs from "src/features/UserBoard/Favs/MyFavs";
import Loader from "@/components/layouts/Loader";
import useLoggedUser from "src/hooks/useLoggedUser";

const UserFavs = () => {
  const { userId, isLoading } = useLoggedUser();

  return isLoading ? (
    <Loader text="Tes shops et clubs favoris se chargent..." />
  ) : userId ? (
    <div className="myFavsContainer">
      <h2 className="center mt5">Mes shops & clubs favoris</h2>
      <div className="underliner" />
      <MyFavs userConnectedId={userId} />
    </div>
  ) : (
    <Login />
  );
};
export default UserFavs;
