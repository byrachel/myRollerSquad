import { useEffect, useState } from "react";
import axios from "axios";

import DisplayTableOrUpdate from "./DisplayTableOrUpdate";
import { PostInterface } from "models/entities/flow.entity";
import Loader from "views/components/layouts/Loader";

interface Props {
  userConnectedId: number;
}

const HandlePosts = ({ userConnectedId }: Props) => {
  const [posts, setPosts] = useState<null | PostInterface[]>(null);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userConnectedId) {
      setLoading(true);
      axios({
        method: "get",
        url: `/api/flow/posts/user/${userConnectedId}`,
        withCredentials: true,
      })
        .then((res) => setPosts(res.data.posts))
        .catch(() => setPosts(null))
        .finally(() => setLoading(false));
    }
  }, [userConnectedId, update]);

  return (
    <>
      {loading ? (
        <Loader text="Tes articles se chargent..." />
      ) : posts && posts.length > 0 ? (
        <DisplayTableOrUpdate
          posts={posts}
          setUpdate={setUpdate}
          userConnectedId={userConnectedId}
        />
      ) : (
        <div style={{ padding: "1.5em" }}>
          <h3 className="mt5">
            <b>Tu n'as publié aucun article pour le moment :(</b>
          </h3>
          <p className="mt5">
            C'est le moment de se jeter à l'eau ! Une jolie photo de ton
            équipement ou de ta dernière session, ce serait parfait pour
            commencer :-)
          </p>
        </div>
      )}
    </>
  );
};
export default HandlePosts;
