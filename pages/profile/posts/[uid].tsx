import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { UserContext } from "src/context/UserContext";
import { PostInterface } from "src/interfaces/flowInterfaces";
import { getCategoryName } from "src/constants/PostCategories";
import { getStyleName } from "src/constants/RollerSkateStyles";
import { displayLightDateTime } from "src/utils/handleDates";
import NewPostBar from "@/components/layouts/NewPostBar";
import Login from "@/components/auth/Login";

const UserPosts = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { userState } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

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
  }, [userState, uid]);

  return userState.isLoggedIn ? (
    <>
      <NewPostBar />
      <div className="userPostsContainer">
        <h2>Mes posts :</h2>
        <br />
        {posts.length > 0 ? (
          <table id="userPosts">
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Styles</th>
              <th>Photos</th>
              <th>Likes</th>
              <th>Commentaires</th>
            </tr>
            {posts.map((post: PostInterface) => (
              <tr key={post.id}>
                <td>
                  <p className="meta">
                    {displayLightDateTime(post.created_at)}
                  </p>
                  <Link href={`/post/${post.id}`}>{post.title}</Link>
                </td>
                <td>{getCategoryName(post.category_id)}</td>
                <td>
                  {post.style.length > 0
                    ? post.style.map((p: { style_id: number }) =>
                        getStyleName(p.style_id)
                      )
                    : null}
                </td>
                <td>{post.pictures.length}</td>
                <td>{post.user_likes.length}</td>
                <td>{post.comments.length}</td>
              </tr>
            ))}
          </table>
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
