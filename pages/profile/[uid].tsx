import { useContext } from "react";
import { useRouter } from "next/router";
import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import { UserContext } from "src/context/UserContext";
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

  console.log("to display", userToDisplay);
  console.log("userState", userState);

  return userState.isLoggedIn && userState.id && userToDisplay ? (
    <UserInfosContainer
      userConnectedId={userState.id}
      userToDisplay={userToDisplay}
    />
  ) : (
    <Login />
  );
};
export default UserProfile;
