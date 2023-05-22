import React, { useEffect, useReducer } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import CardContainer from "src/features/Flow/getPosts/CardContainer";
import FlowReducer from "src/reducers/FlowReducer";
import FlowFilters from "src/features/Flow/getPosts/FlowFilters";
import { PostInterface } from "src/entities/flow.entity";
import Loader from "@/components/layouts/Loader";

const breakpointColumnsObj = {
  default: 3,
  1600: 2,
  768: 1,
};

const initialState = {
  cursor: 0,
  category: null,
  style: null,
  posts: [],
};

interface Props {
  userConnectedId: number;
}

const Flow = ({ userConnectedId }: Props) => {
  const [flowStore, flowDispatch] = useReducer(FlowReducer, initialState);
  const posts = flowStore.posts;

  const nextId = flowStore.cursor ? flowStore.cursor : 0;
  const category = flowStore.category
    ? `category=${flowStore.category}`
    : `category=`;
  const style = flowStore.style ? `style=${flowStore.style}` : `style=`;

  const fetchPosts = () => {
    axios({
      method: "get",
      url: `/api/flow/posts/${nextId}?${category}&${style}`,
      withCredentials: true,
    }).then((res) => {
      flowDispatch({
        type: "SET_POSTS",
        payload: {
          posts: [...flowStore.posts, ...res.data.posts],
          cursor: res.data.nextId ? res.data.nextId : null,
        },
      });
    });
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [category, style]);

  const newLimit = () => {
    fetchPosts();
  };

  return (
    <>
      <div className="flow">
        <FlowFilters flowDispatch={flowDispatch} />
        {posts ? (
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
        ) : (
          <Loader text="Publications en cours de chargement..." />
        )}
      </div>
    </>
  );
};
export default Flow;
