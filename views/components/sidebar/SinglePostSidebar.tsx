import { useEffect, useState } from "react";
import Avatar from "../../features/Flow/getPosts/Avatar";
import axios from "axios";
import { getCategoryName } from "views/constants/PostCategories";

interface Props {
  user: { id: number; name: string; avatar: string | null };
  place?: { id: number; name: string; logo: string | null } | null;
}

export default function SinglePostSidebar({ user, place }: Props) {
  const [lastPosts, setLastPosts] = useState([]);
  useEffect(() => {
    if (place && place.id) {
      axios
        .get(`/api/flow/posts/place/latest/${place.id}`)
        .then((res) => setLastPosts(res.data.posts))
        .catch(() => setLastPosts([]));
    } else {
      axios
        .get(`/api/flow/posts/user/latest/${user.id}`)
        .then((res) => setLastPosts(res.data.posts))
        .catch(() => setLastPosts([]));
    }
  }, [place, user]);

  return (
    <>
      <div className="center mt5">
        <Avatar
          userId={user.id}
          userAvatar={user.avatar}
          color="pink"
          placeId={place ? place.id : null}
          logo={place ? place.logo : null}
        />
        <h3>{user.name}</h3>
        <p className="meta">{lastPosts.length} articles publiés</p>
      </div>
      <div className="underliner" />
      {lastPosts.length > 0 ? (
        <div className="lastPosts">
          <p>Derniers articles:</p>
          <ul>
            {lastPosts.map(
              (elt: { id: number; title: string; category_id: number }) => (
                <li key={elt.id}>
                  <a href={`/post/${elt.id}`}>{elt.title}</a>
                  <br />
                  <p className="detail">{getCategoryName(elt.category_id)}</p>
                </li>
              )
            )}
          </ul>
        </div>
      ) : null}
    </>
  );
}
