import { PostInterface } from "client/entities/flow.entity";
import React from "react";
import Card from "../Flow/getPosts/Card";
import RegularButton from "../../components/buttons/RegularButton";
import { useRouter } from "next/router";

interface Props {
  userConnectedId: number;
  posts: PostInterface[];
}

export default function LastPostsShared({ userConnectedId, posts }: Props) {
  const router = useRouter();

  return posts.length > 0 ? (
    <div className="userFlowContainer">
      <h2 className="title">Derniers articles partagés</h2>
      <div className="flowContainer">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="lastPostsShared" key={post.id}>
              <Card
                post={post}
                userConnectedId={userConnectedId}
                displayAvatar={false}
              />
            </div>
          ))
        ) : (
          <div className="centeredText">
            <p className="meta">Aucun article partagé.</p>
            <RegularButton
              text="Créer un article"
              type="button"
              style="outline"
              onClick={() => router.push("/post/newpost")}
            />
          </div>
        )}
      </div>
    </div>
  ) : null;
}
