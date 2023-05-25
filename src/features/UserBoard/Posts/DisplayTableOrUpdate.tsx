import { useState } from "react";
import { useSession } from "next-auth/react";

import PostsTable from "./PostsTable";
import EditPost from "src/features/Flow/singlePost/EditPost";
import RegularButton from "src/components/buttons/RegularButton";
import { PostInterface } from "src/entities/flow.entity";

interface Props {
  posts: PostInterface[];
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  userConnectedId: number;
}

const DisplayTableOrUpdate = ({ posts, setUpdate, userConnectedId }: Props) => {
  const { data: session } = useSession() as any;
  const userRole = session?.user?.role;
  const [editPost, setEditPost] = useState<{
    show: boolean;
    post: null | PostInterface;
  }>({ show: false, post: null });

  return (
    <div className="userPostsContainer">
      {editPost.show && editPost.post ? (
        <>
          <div className="spaceBetween mt5">
            <h2>Mes publications</h2>
            <RegularButton
              type="button"
              style="full"
              text="retour"
              onClick={() => setEditPost({ show: false, post: null })}
            />
          </div>
          <EditPost
            postToEdit={editPost.post}
            userConnectedId={userConnectedId}
            isPro={userRole === "PRO"}
          />
        </>
      ) : (
        <PostsTable
          userId={userConnectedId}
          posts={posts}
          setUpdate={setUpdate}
          setEditPost={setEditPost}
        />
      )}
    </div>
  );
};
export default DisplayTableOrUpdate;
