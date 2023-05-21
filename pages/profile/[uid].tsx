import { useRouter } from "next/router";
import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import MyInfosContainer from "src/features/UserProfile/MyInfosContainer";
import Loader from "@/components/layouts/Loader";
import { useUser } from "src/hooks/useUser";

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
