import { useRouter } from "next/router";
import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import Login from "src/features/auth/Login";
import MyInfosContainer from "src/features/UserProfile/MyInfosContainer";
import useLoggedUser from "src/hooks/useLoggedUser";
import Loader from "@/components/layouts/Loader";

const UserProfile = () => {
  const router = useRouter();
  const { userId, isLoading } = useLoggedUser();
  const { uid } = router.query;

  const userToDisplay = userId
    ? uid === "me"
      ? userId
      : parseInt(uid as string)
    : null;

  return isLoading ? (
    <Loader text="Chargement des données en cours..." />
  ) : userId && uid === "me" ? (
    <MyInfosContainer userConnectedId={userId} />
  ) : userToDisplay && userId ? (
    <UserInfosContainer
      userConnectedId={userId}
      userToDisplay={userToDisplay}
    />
  ) : (
    <Login />
  );
};
export default UserProfile;
