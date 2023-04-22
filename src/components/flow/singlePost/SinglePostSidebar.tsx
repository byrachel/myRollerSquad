import { PostInterface } from "src/interfaces/flowInterfaces";
import Avatar from "../getPosts/Avatar";

interface Props {
  post: PostInterface;
}

export default function SinglePostSidebar({ post }: Props) {
  return (
    <>
      <div className="center mt5">
        <Avatar userId={post.user.id} userAvatar={post.user.avatar} />
        <h3>{post.user.name}</h3>
        <p className="meta">{post.user.posts.length} articles publiés</p>
      </div>

      {post.user.posts.length > 1 ? (
        <div className="lastPosts">
          <h3>Derniers articles:</h3>
          <ul>
            {post.user.posts.map(elt =>
              post.id === elt.id ? null : (
                <li key={post.id}>
                  <a href={`/post/${elt.id}`}>{elt.title}</a>
                </li>
              )
            )}
          </ul>
        </div>
      ) : null}
    </>
  );
}
