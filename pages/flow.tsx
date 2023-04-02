import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Card from "app/components/flow/getPosts/Card";
import NewPostBar from "app/components/layouts/NewPostBar";
import { PostInterface } from "app/interfaces/flowInterfaces";
import axios from "axios";
import withAuth from "app/utils/withAuth";
import { UserInterface } from "app/interfaces/userInterfaces";

const breakpointColumnsObj = {
  default: 2,
  700: 1,
};

const Flow = () => {
  const [cursor, setCursor] = useState(0);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [refetch, setRefetch] = useState(0);

  const fetchPosts = () => {
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
                <Card
                  post={post}
                  isLast={index === posts.length - 1}
                  newLimit={() => setRefetch(refetch + 1)}
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
