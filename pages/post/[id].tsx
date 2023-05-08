import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import axios from "axios";
import NewPostBar from "src/components/layouts/NewPostBar";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import SinglePostSidebar from "src/features/Flow/singlePost/SinglePostSidebar";
import SinglePost from "src/features/Flow/singlePost/SinglePost";
import { State, useStore } from "src/hooks/useStore";

export default function Post() {
  const { userId, userRole } = useStore(
    (state: State) => ({
      userId: state.userId,
      userRole: state.userRole,
    }),
    shallow
  );

  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/flow/post/${id}`).then((res) => {
        setPost(res.data.post);
      });
    }
  }, [id]);

  return (
    <>
      <NewPostBar />
      {post ? (
        <SidebarLayout
          sidebar={<SinglePostSidebar post={post} />}
          content={
            <SinglePost
              post={post}
              userConnectedId={userId}
              isPro={userRole === "PRO"}
            />
          }
        />
      ) : null}
    </>
  );
}
