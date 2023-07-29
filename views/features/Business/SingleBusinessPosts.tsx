import React from "react";
import { useSession } from "next-auth/react";

import { PostInterface } from "models/entities/flow.entity";
import Card from "../Flow/getPosts/Card";

interface Props {
  posts: PostInterface[];
}

export default function SingleBusinessPosts({ posts }: Props) {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

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
