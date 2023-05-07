import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "src/context/UserContext";
import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import Login from "@/components/auth/Login";

const UserProfile = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { userState } = useContext(UserContext);

  const userToDisplay = userState.isLoggedIn
    ? uid === "me"
      ? userState.id
      : parseInt(uid as string)
    : null;

  return userState.isLoggedIn && userToDisplay && userState.id ? (
    <UserInfosContainer
      userConnectedId={userState.id}
      userToDisplay={userToDisplay}
      userRole={userState.role}
    />
  ) : (
    <Login />
  );
};
export default UserProfile;
