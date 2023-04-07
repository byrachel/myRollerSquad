import { PostInterface } from "app/interfaces/flowInterfaces";
import React from "react";
import Card from "../flow/getPosts/Card";
import Masonry from "react-masonry-css";
import RegularButton from "../buttons/RegularButton";
import { useRouter } from "next/router";

interface Props {
  posts: PostInterface[];
}

const breakpointColumnsObj = {
  default: 3,
  700: 1,
};

export default function LastPostsShared({ posts }: Props) {
  const router = useRouter();
  return (
    <div className="userFlowContainer">
      <h2 className="title">Derniers articles partagés</h2>
      <div className="smallLightSeparator" />
      <div className="flowContainer">
        {posts.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map(post => (
              <div key={post.id}>
                <Card post={post} isAuthor />
              </div>
            ))}
          </Masonry>
        ) : (
          <div className="centeredText">
            <p className="meta">Aucun article partagé.</p>
            <RegularButton
              text="Créer un article"
              type="button"
              style="outline"
              onClick={() => router.push("/newpost")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
