import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Card from "app/components/flow/getPosts/Card";
import NewPostBar from "app/components/layouts/NewPostBar";
import { PostInterface } from "app/interfaces/flowInterfaces";

const breakpointColumnsObj = {
  default: 2,
  700: 1,
};

export default function Flow() {
  const [cursor, setCursor] = useState(0);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [refetch, setRefetch] = useState(0);

  const fetchPosts = async () => {
    const response = await fetch(`http://localhost:3000/api/flow/${cursor}`);
    const data = await response.json();
    setPosts([...posts, ...data.posts]);
    setCursor(data.nextId);
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
}
