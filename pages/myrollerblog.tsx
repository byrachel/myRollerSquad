import Loader from "@/components/layouts/Loader";
import NewPostBar from "src/components/layouts/NewPostBar";
import Flow from "src/features/Flow/getPosts/Flow";
import Login from "src/features/auth/Login";
import useLoggedUser from "src/hooks/useLoggedUser";

const MyRollerBlog = () => {
  const { userId, isLoading } = useLoggedUser();

  return isLoading ? (
    <Loader text="Chargement des publications en cours... N'hésite pas à publier toi aussi :)" />
  ) : (
    <>
      {userId ? (
        <>
          <NewPostBar />
          <Flow userConnectedId={userId} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
export default MyRollerBlog;
