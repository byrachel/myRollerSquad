import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "src/context/UserContext";
import NewPostBar from "src/components/layouts/NewPostBar";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import SinglePostSidebar from "src/features/Flow/singlePost/SinglePostSidebar";
import SinglePost from "src/features/Flow/singlePost/SinglePost";
import axios from "axios";

export default function Post() {
  const { userState } = useContext(UserContext);
  const userConnectedId = userState.id;
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
          content={<SinglePost post={post} userConnectedId={userConnectedId} />}
        />
      ) : null}
    </>
  );
}
