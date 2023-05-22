import { useEffect, useState } from "react";
import axios from "axios";
import DisplayTableOrUpdate from "./DisplayTableOrUpdate";
import { PostInterface } from "client/entities/flow.entity";

interface Props {
  userConnectedId: number;
}

const HandlePosts = ({ userConnectedId }: Props) => {
  const [posts, setPosts] = useState<null | PostInterface[]>(null);
  const [update, setUpdate] = useState(false);

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
      {!posts ? null : posts.length === 0 ? (
        <>
          <h2>Mes publications</h2>
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
        <DisplayTableOrUpdate
          posts={posts}
          setUpdate={setUpdate}
          userConnectedId={userConnectedId}
        />
      )}
    </div>
  );
};
export default HandlePosts;
