import NewPostBar from "src/components/layouts/NewPostBar";
import Flow from "src/features/Flow/getPosts/Flow";
import Login from "src/features/auth/Login";
import useLoggedUser from "src/hooks/useLoggedUser";

const MyRollerBlog = () => {
  const { userId } = useLoggedUser();

  return (
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
