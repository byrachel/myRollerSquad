import React, { useEffect, useReducer } from "react";
import FlowReducer from "views/reducers/FlowReducer";
import FlowFilters from "views/features/Flow/getPosts/FlowFilters";
import SidebarLayout from "views/components/layouts/SidebarLayout";
import FlowCards from "./FlowCards";
import { FlowRepo } from "../utils/flow.repo";

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

  const category = flowStore.category
    ? `category=${flowStore.category}`
    : `category=`;
  const style = flowStore.style ? `style=${flowStore.style}` : `style=`;

  const fetchPosts = async () => {
    const nextId = flowStore.cursor ? flowStore.cursor : 0;
    const postsRepo = new FlowRepo();
    const flow = await postsRepo.getPosts(nextId, category, style);
    flowDispatch({
      type: "SET_POSTS",
      payload: {
        posts: [...flowStore.posts, ...flow.posts],
        cursor: flow.cursor,
      },
    });
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
      {window.innerWidth < 860 ? (
        <div
          style={{
            paddingLeft: "0.7em",
            paddingRight: "0.7em",
            paddingTop: "1em",
          }}
        >
          <FlowFilters flowDispatch={flowDispatch} />
        </div>
      ) : null}
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
          <FlowCards
            posts={posts}
            userConnectedId={userConnectedId}
            newLimit={newLimit}
          />
        }
      />
    </div>
  );
};
export default Flow;
