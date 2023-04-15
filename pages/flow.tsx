import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import NewPostBar from "app/components/layouts/NewPostBar";
import CardContainer from "@/components/flow/getPosts/CardContainer";
import { PostInterface } from "app/interfaces/flowInterfaces";
import { useRouter } from "next/router";

const breakpointColumnsObj = {
  default: 2,
  700: 1,
};

const Flow = () => {
  const [cursor, setCursor] = useState(0);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [refetch, setRefetch] = useState(0);
  const router = useRouter();

  console.log("posts", posts);

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const nextId = cursor ? cursor : 0;
      axios({
        method: "get",
        url: `/api/flow/posts/${nextId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(res => {
          setPosts([...posts, ...res.data.posts]);
          setCursor(res.data.nextId);
        })
        .catch(err => {
          console.log(err);
          router.push("/signin");
        });
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
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
export default Flow;
