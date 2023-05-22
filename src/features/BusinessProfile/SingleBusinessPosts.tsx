import React from "react";
import { PostWithAuthorInterface } from "src/entities/flow.entity";
import { State, useUser } from "src/hooks/useUser";
import Card from "../Flow/getPosts/Card";

interface Props {
  posts: PostWithAuthorInterface[];
}

export default function SingleBusinessPosts({ posts }: Props) {
  const userId = useUser((state: State) => state.userId);

  return (
    <div className="darkContainer">
      <h2 className="title mt5">Dernières publications</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="lastPostsShared mt-large" key={post.id}>
            <Card post={post} userConnectedId={userId} displayAvatar={false} />
          </div>
        ))
      ) : (
        <p className="center meta mt5">Aucun article publié pour le moment.</p>
      )}
    </div>
  );
}
