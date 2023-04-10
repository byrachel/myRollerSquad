import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import withAuth from "app/utils/withAuth";
import NewPostBar from "app/components/layouts/NewPostBar";
import CardContainer from "@/components/flow/getPosts/CardContainer";
import { PostInterface } from "app/interfaces/flowInterfaces";

const breakpointColumnsObj = {
  default: 2,
  700: 1,
};

const Flow = () => {
  const [cursor, setCursor] = useState(0);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [refetch, setRefetch] = useState(0);

  const fetchPosts = () => {
    if (cursor === undefined) return;
    if (cursor >= 0) {
      const token = localStorage.getItem("token");
      axios({
        method: "get",
        url: `/api/flow/${cursor}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(res => {
          setPosts([...posts, ...res.data.posts]);
          setCursor(res.data.nextId);
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refetch]);

  return (
    <>
      <NewPostBar />
      <div className="flowContainer">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts && posts.length > 0
            ? posts.map((post, index) => (
                <CardContainer
                  post={post}
                  isLast={index === posts.length - 1}
                  newLimit={() =>
                    cursor !== undefined ? setRefetch(refetch + 1) : null
                  }
                  key={post.id}
                />
              ))
            : null}
        </Masonry>
      </div>
    </>
  );
};
export default withAuth(Flow);
