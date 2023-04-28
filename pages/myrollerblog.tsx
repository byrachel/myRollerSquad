import NewPostBar from "src/components/layouts/NewPostBar";
import Flow from "src/features/Flow/getPosts/Flow";
import Login from "@/components/auth/Login";
import { useContext } from "react";
import { UserContext } from "src/context/UserContext";

const MyRollerBlog = () => {
  const { userState } = useContext(UserContext);
  const userId = userState.isLoggedIn ? userState.id : null;
  return userId ? (
    <>
      <NewPostBar />
      <Flow userConnectedId={userId} />
    </>
  ) : (
    <Login />
  );
};
export default MyRollerBlog;
