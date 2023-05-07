import { PostInterface } from "src/interfaces/flowInterfaces";
import React, { useEffect } from "react";
import Card from "../Flow/getPosts/Card";
import RegularButton from "../../components/buttons/RegularButton";
import { useRouter } from "next/router";
import axios from "axios";

interface Props {
  userToDisplay: number;
  userConnectedId: number;
  userProfileDispatch: React.Dispatch<any>;
  posts: PostInterface[];
}

export default function LastPostsShared({
  userToDisplay,
  userConnectedId,
  userProfileDispatch,
  posts,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    if (userToDisplay) {
      axios(`/api/flow/posts/user/latest/${userToDisplay}`, {
        method: "GET",
        withCredentials: true,
      }).then((res) => {
        userProfileDispatch({
          type: "SET_LAST_POSTS",
          payload: res.data.posts,
        });
      });
    }
    // eslint-disable-next-line
  }, [userToDisplay]);

  return posts.length > 0 ? (
    <div className="userFlowContainer">
      <h2 className="title">Derniers articles partagés</h2>
      <div className="smallLightSeparator" />
      <div className="flowContainer">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="lastPostsShared" key={post.id}>
              <Card
                post={post}
                userConnectedId={userConnectedId}
                isAuthor={userConnectedId === userToDisplay}
              />
            </div>
          ))
        ) : (
          <div className="centeredText">
            <p className="meta">Aucun article partagé.</p>
            <RegularButton
              text="Créer un article"
              type="button"
              style="outline"
              onClick={() => router.push("/post/newpost")}
            />
          </div>
        )}
      </div>
    </div>
  ) : null;
}
