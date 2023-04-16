import React, { useEffect, useReducer } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import NewPostBar from "app/components/layouts/NewPostBar";
import CardContainer from "@/components/flow/getPosts/CardContainer";
import { useRouter } from "next/router";
import withAuth from "app/utils/withAuth";
import FlowReducer from "app/reducers/FlowReducer";
import FlowFilters from "@/components/flow/getPosts/FlowFilters";
import { PostInterface } from "app/interfaces/flowInterfaces";

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
  refetch: 0,
};

const Flow = () => {
  const router = useRouter();
  const [flowStore, flowDispatch] = useReducer(FlowReducer, initialState);
  const posts = flowStore.posts;

  const nextId = flowStore.cursor ? flowStore.cursor : 0;
  const category = flowStore.category ? `&category=${flowStore.category}` : "";
  const style = flowStore.style ? `&style=${flowStore.style}` : "";
  const url = `/api/flow/posts/filtered?cursor=${nextId}&${category}&${style}`;

  const fetchPosts = (token: string | null) => {
    axios({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(res => {
        flowDispatch({
          type: "SET_POSTS",
          payload: {
            posts: res.data.posts,
            cursor: res.data.nextId ? res.data.nextId : null,
          },
        });
      })
      .catch(() => router.push("/signin"));
  };

  const fetchNewPosts = (token: string | null) => {
    axios({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(res => {
        flowDispatch({
          type: "SET_POSTS",
          payload: {
            posts: [...flowStore.posts, ...res.data.posts],
            cursor: res.data.nextId ? res.data.nextId : null,
          },
        });
      })
      .catch(() => router.push("/signin"));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchNewPosts(token);
    } else {
      router.push("/signin");
    }
    // eslint-disable-next-line
  }, [flowStore.refetch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchPosts(token);
    } else {
      router.push("/signin");
    }
    // eslint-disable-next-line
  }, [flowStore.category, flowStore.style]);

  const newLimit = () => {
    flowDispatch({ type: "SET_REFETCH", payload: flowStore.refetch + 1 });
  };

  return (
    <>
      <NewPostBar />
      <div className="responsiveFlowContainer">
        <div className="flowContainer">
          <FlowFilters flowStore={flowStore} flowDispatch={flowDispatch} />
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts && posts.length > 0
              ? posts.map((post: PostInterface, index: number) => (
                  <CardContainer
                    post={post}
                    isLast={index === posts.length - 1}
                    newLimit={newLimit}
                    key={post.id}
                    flowDispatch={flowDispatch}
                  />
                ))
              : null}
          </Masonry>
        </div>
      </div>
    </>
  );
};
export default withAuth(Flow);
