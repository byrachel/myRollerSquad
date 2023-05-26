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
          <div className="metaUnderliner" />
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => setEditPost({ show: false, post: null })}
            onClick={() => setEditPost({ show: false, post: null })}
          >
            <p className="meta center fakeLink">Modifier l'article | X</p>
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
