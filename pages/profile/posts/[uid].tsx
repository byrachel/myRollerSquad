import NewPostBar from "@/components/layouts/NewPostBar";
import HandlePosts from "src/features/UserBoard/Posts/HandlePosts";
import Loader from "@/components/layouts/Loader";
import MyInfosMenu from "src/features/UserProfile/MyInfosMenu";
import { useUser } from "src/hooks/useUser";

const UserPosts = () => {
  const userId = useUser((state) => state.userId);

  return (
    <>
      <NewPostBar />
      {userId ? (
        <div className="mt5">
          <MyInfosMenu userConnectedId={userId} isMyProfile={false} />
          <HandlePosts userConnectedId={userId} />
        </div>
      ) : (
        <Loader text="Génération de toutes tes publications en cours..." />
      )}
    </>
  );
};
export default UserPosts;
