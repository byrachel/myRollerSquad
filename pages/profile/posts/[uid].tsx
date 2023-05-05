import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "src/context/UserContext";
import NewPostBar from "@/components/layouts/NewPostBar";
import Login from "@/components/auth/Login";
import PostsTable from "./PostsTable";

const UserPosts = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { userState } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (typeof uid === "string" && parseInt(uid) === userState.id) {
      axios({
        method: "get",
        url: `/api/flow/posts/user/${uid}`,
        withCredentials: true,
      })
        .then((res) => setPosts(res.data.posts))
        .catch(() => setPosts([]));
    }
  }, [userState, uid, update]);

  return userState.isLoggedIn ? (
    <>
      <NewPostBar />
      <div className="userPostsContainer">
        <h2>Mes posts :</h2>
        <br />
        {posts.length > 0 ? (
          <PostsTable posts={posts} setUpdate={setUpdate} />
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
    </>
  ) : (
    <Login />
  );
};
export default UserPosts;
