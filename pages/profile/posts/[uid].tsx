import NewPostBar from "@/components/layouts/NewPostBar";
import Login from "src/features/auth/Login";
import HandlePosts from "src/features/UserBoard/Posts/HandlePosts";
import useLoggedUser from "src/hooks/useLoggedUser";
import Loader from "@/components/layouts/Loader";

const UserPosts = () => {
  const { userId, isLoading } = useLoggedUser();

  return isLoading ? (
    <Loader text="Génération de toutes tes publications en cours..." />
  ) : userId ? (
    <>
      <NewPostBar />
      <HandlePosts userConnectedId={userId} />
    </>
  ) : (
    <Login />
  );
};
export default UserPosts;
