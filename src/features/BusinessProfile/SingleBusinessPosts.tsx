import React from "react";
import { PostInterface } from "src/interfaces/flowInterfaces";
import Card from "../Flow/getPosts/Card";
import { State, useUser } from "src/hooks/useUser";

interface Props {
  posts: PostInterface[];
}

export default function SingleBusinessPosts({ posts }: Props) {
  const userId = useUser((state: State) => state.userId);

  return (
    <div className="darkContainer">
      <h2 className="title mt5">Articles publiés</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="lastPostsShared" key={post.id}>
            <Card post={post} userConnectedId={userId} displayAvatar={false} />
          </div>
        ))
      ) : (
        <p className="center meta mt5">Aucun article publié pour le moment.</p>
      )}
    </div>
  );
}
