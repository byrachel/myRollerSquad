import { useRouter } from "next/router";
import UserInfosContainer from "client/features/UserProfile/UserInfosContainer";
import MyInfosContainer from "client/features/UserProfile/MyInfosContainer";
import Loader from "client/components/layouts/Loader";
import { useUser } from "client/hooks/useUser";

const UserProfile = () => {
  const router = useRouter();
  const userId = useUser((state) => state.userId);
  const { uid } = router.query;

  const userToDisplay = userId
    ? uid === "me"
      ? userId
      : parseInt(uid as string)
    : null;

  return userId && uid === "me" ? (
    <MyInfosContainer userConnectedId={userId} />
  ) : userToDisplay && userId ? (
    <UserInfosContainer
      userConnectedId={userId}
      userToDisplay={userToDisplay}
    />
  ) : (
    <Loader text="Chargement des données en cours..." />
  );
};
export default UserProfile;
