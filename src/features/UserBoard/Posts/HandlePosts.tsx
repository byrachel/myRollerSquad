import { useEffect, useState } from "react";
import axios from "axios";

import PostsTable from "./PostsTable";
import EditPost from "src/features/Flow/singlePost/EditPost";
import { PostInterface } from "src/interfaces/flowInterfaces";
import RegularButton from "@/components/buttons/RegularButton";

interface Props {
  userConnectedId: number;
  isPro: boolean;
}

const HandlePosts = ({ userConnectedId, isPro }: Props) => {
  const [posts, setPosts] = useState([]);
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
        .catch(() => setPosts([]));
    }
  }, [userConnectedId, update]);

  return (
    <div className="userPostsContainer">
      <div className="spaceBetween">
        <h2>Mes posts :</h2>
        {editPost.show ? (
          <RegularButton
            type="button"
            style="outline"
            text="retour"
            onClick={() => setEditPost({ show: false, post: null })}
          />
        ) : null}
      </div>
      {editPost.show && editPost.post ? (
        <EditPost
          postToEdit={editPost.post}
          userConnectedId={userConnectedId}
          isPro={isPro}
        />
      ) : posts.length > 0 ? (
        <PostsTable
          posts={posts}
          setUpdate={setUpdate}
          setEditPost={setEditPost}
        />
      ) : (
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
      )}
    </div>
  );
};
export default HandlePosts;
