import { useEffect, useState } from "react";
import axios from "axios";

import PostsTable from "./PostsTable";
import EditPost from "src/features/Flow/singlePost/EditPost";
import { PostInterface } from "src/interfaces/flowInterfaces";
import RegularButton from "@/components/buttons/RegularButton";
import { State, useUser } from "src/hooks/useUser";

interface Props {
  userConnectedId: number;
}

const HandlePosts = ({ userConnectedId }: Props) => {
  const userRole = useUser((state: State) => state.userRole);
  const [posts, setPosts] = useState<null | PostInterface[]>([]);
  const [update, setUpdate] = useState(false);
  const [editPost, setEditPost] = useState<{
    show: boolean;
    post: null | PostInterface;
  }>({ show: false, post: null });

  useEffect(() => {
    if (userConnectedId) {
      axios({
        method: "get",
        url: `/api/flow/posts/user/${userConnectedId}`,
        withCredentials: true,
      })
        .then((res) => setPosts(res.data.posts))
        .catch(() => setPosts(null));
    }
  }, [userConnectedId, update]);

  return (
    <div className="userPostsContainer">
      <div className="spaceBetween mt5">
        <h2>Mes publications</h2>
        {editPost.show ? (
          <RegularButton
            type="button"
            style="full"
            text="retour"
            onClick={() => setEditPost({ show: false, post: null })}
          />
        ) : null}
      </div>
      {editPost.show && editPost.post ? (
        <EditPost
          postToEdit={editPost.post}
          userConnectedId={userConnectedId}
          isPro={userRole === "PRO"}
        />
      ) : null}

      {!posts || posts.length === 0 ? (
        <>
          <p className="mt5">
            <b>Tu n'as publié aucun article pour le moment :(</b>
          </p>
          <p className="mt5">
            C'est le moment de se jeter à l'eau ! <br />
            Une jolie photo de ton équipement ou de ta dernière session, ce
            serait parfait pour commencer :-)
          </p>
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
export default HandlePosts;
