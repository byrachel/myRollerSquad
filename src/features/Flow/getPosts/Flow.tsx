import React, { useEffect, useReducer } from "react";
import axios from "axios";
import FlowReducer from "src/reducers/FlowReducer";
import FlowFilters from "src/features/Flow/getPosts/FlowFilters";
import Loader from "src/components/layouts/Loader";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import FlowCards from "./FlowCards";

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
    })
      .then((res) => {
        flowDispatch({
          type: "SET_POSTS",
          payload: {
            posts: [...flowStore.posts, ...res.data.posts],
            cursor: res.data.nextId ? res.data.nextId : null,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchPosts();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [category, style]);

  const newLimit = () => {
    fetchPosts();
  };

  return (
    <div className="flow">
      {window.innerWidth > 860 ? (
        <SidebarLayout
          sidebar={
            <>
              <div className="sidebarText">
                <FlowFilters flowDispatch={flowDispatch} />
                <div className="mt-large" />
                <p className="meta">
                  myRollerSquad est une communauté active & bienveillante de
                  passionnés de roller quad.
                </p>
              </div>
            </>
          }
          content={
            <>
              {posts ? (
                <FlowCards
                  posts={posts}
                  userConnectedId={userConnectedId}
                  newLimit={newLimit}
                />
              ) : (
                <Loader text="Publications en cours de chargement..." />
              )}
            </>
          }
        />
      ) : (
        <>
          <FlowFilters flowDispatch={flowDispatch} />
          {posts ? (
            <FlowCards
              posts={posts}
              userConnectedId={userConnectedId}
              newLimit={newLimit}
            />
          ) : (
            <Loader text="Publications en cours de chargement..." />
          )}
        </>
      )}
    </div>
  );
};
export default Flow;
