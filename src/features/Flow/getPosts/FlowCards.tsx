import React from "react";
import Masonry from "react-masonry-css";
import CardContainer from "src/features/Flow/getPosts/CardContainer";
import { PostInterface } from "src/entities/flow.entity";

const breakpointColumnsObj = {
  default: 3,
  1600: 2,
  768: 1,
};

interface Props {
  posts: PostInterface[];
  userConnectedId: number;
  newLimit: any;
}

const FlowCards = ({ posts, userConnectedId, newLimit }: Props) => {
  return (
    <div className="responsiveFlowContainer">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts.length > 0
          ? posts.map((post: PostInterface, index: number) => (
              <CardContainer
                key={post.id}
                post={post}
                isLast={index === posts.length - 1}
                newLimit={newLimit}
                userConnectedId={userConnectedId}
              />
            ))
          : null}
      </Masonry>
    </div>
  );
};
export default FlowCards;
