import { useRouter } from "next/router";
import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import Login from "src/features/auth/Login";
import MyInfosContainer from "src/features/UserProfile/MyInfosContainer";
import useLoggedUser from "src/hooks/useLoggedUser";

const UserProfile = () => {
  const router = useRouter();
  const { userId } = useLoggedUser();
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
    <Login />
  );
};
export default UserProfile;
