import { useRouter } from "next/router";
import { useContext } from "react";

import { UserContext } from "src/context/UserContext";
import NewPostBar from "@/components/layouts/NewPostBar";
import Login from "@/components/auth/Login";
import HandlePosts from "src/features/UserBoard/Posts/HandlePosts";

const UserPosts = () => {
  const router = useRouter();
  const { uid } = router.query;
  const userId = parseInt(uid as string);
  const { userState } = useContext(UserContext);

  return userState.isLoggedIn && userState.id && userState.id === userId ? (
    <>
      <NewPostBar />
      <HandlePosts userConnectedId={userState.id} />
    </>
  ) : (
    <Login />
  );
};
export default UserPosts;
