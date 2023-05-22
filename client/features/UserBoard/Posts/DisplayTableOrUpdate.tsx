import { useState } from "react";

import PostsTable from "./PostsTable";
import EditPost from "client/features/Flow/singlePost/EditPost";
import { PostInterface } from "client/entities/flow.entity";
import RegularButton from "client/components/buttons/RegularButton";
import { State, useUser } from "client/hooks/useUser";

interface Props {
  posts: PostInterface[];
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  userConnectedId: number;
}

const DisplayTableOrUpdate = ({ posts, setUpdate, userConnectedId }: Props) => {
  const userRole = useUser((state: State) => state.userRole);
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
          posts={posts}
          setUpdate={setUpdate}
          setEditPost={setEditPost}
        />
      )}
    </div>
  );
};
export default DisplayTableOrUpdate;
