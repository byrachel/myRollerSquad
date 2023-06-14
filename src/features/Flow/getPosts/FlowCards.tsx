import React from "react";
import Masonry from "react-masonry-css";
import CardContainer from "src/features/Flow/getPosts/CardContainer";
import { PostInterface } from "src/entities/flow.entity";
import Loader from "@/components/layouts/Loader";

const breakpointColumnsObj = {
  default: 3,
  1600: 2,
  768: 1,
};

interface Props {
  posts: PostInterface[];
  userConnectedId: number;
  newLimit: () => void;
}

const FlowCards = ({ posts, userConnectedId, newLimit }: Props) => {
  return (
    <div className="responsiveFlowContainer">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts && posts.length > 0 ? (
          posts.map((post: PostInterface, index: number) => (
            <CardContainer
              key={post.id}
              post={post}
              isLast={index === posts.length - 1}
              newLimit={newLimit}
              userConnectedId={userConnectedId}
            />
          ))
        ) : (
          <Loader text="Publications en cours de chargement..." />
        )}
      </Masonry>
    </div>
  );
};
export default FlowCards;
