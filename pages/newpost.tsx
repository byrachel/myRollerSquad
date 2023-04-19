import React, { SyntheticEvent, useContext, useReducer, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Sidebar from "app/components/flow/addPost/Sidebar";
import RegularButton from "app/components/buttons/RegularButton";
import DisplayLocation from "app/components/flow/addPost/DisplayLocation";
import Modal from "app/components/layouts/Modal";
import { PostReducer } from "app/reducers/PostReducer";
import { NewPostFactory } from "app/components/flow/addPost/utils/NewPostFactory";
import { newPostInitialState } from "app/components/flow/addPost/utils/newPostInitialState";
import NewPostForm from "app/components/flow/addPost/NewPostForm";
import withAuth from "app/utils/withAuth";
import { UserContext } from "app/context/UserContext";

const NewPost = () => {
  const router = useRouter();
  const { userState } = useContext(UserContext);

  const [post, postDispatch] = useReducer(PostReducer, newPostInitialState);
  const [showMap, setShowMap] = useState(false);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!userState.user.id) return router.push("/signin");

    const target = event.target as typeof event.target & {
      title: { value: string };
      link: { value: string };
      price: { value?: number };
      duration: { value?: number };
      distance: { value?: string };
    };

    if (!target.title.value) {
      return postDispatch({
        type: "TITLE_ERROR",
        payload: true,
      });
    } else {
      const newPost = {
        user_id: userState.user.id,
        title: target.title.value,
        content: post.content,
        price: target.price && target.price.value ? target.price.value : null,
        category_id: post.category,
        style_id: post.style ? post.style : null,
        link: target.link && target.link.value ? target.link.value : null,
        duration:
          target.duration && target.duration.value
            ? target.duration.value
            : null,
        distance:
          target.distance && target.distance.value
            ? parseFloat(target.distance.value)
            : null,
        position: post.position ? post.position : null,
        country: post.country ? post.country : null,
        city: post.city ? post.city : null,
        squad_ids: [],
      };

      const newPostFactory = new NewPostFactory();
      const newPostToSave = newPostFactory.create(newPost);

      const data = new FormData();

      for (const [key, value] of Object.entries(newPostToSave)) {
        data.append(key, value);
      }
      if (post.map) {
        data.append("pictures", post.map, "map.png");
      }
      for (const image of post.pictures) {
        if (image.name !== "map.png") {
          data.append("pictures", image);
        }
      }
      const token = localStorage.getItem("token");

      // console.log(Object.fromEntries(data));

      axios({
        method: "post",
        url: `/api/flow/post/add`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(() => router.push("/flow"))
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <div className="coloredSeparator" />
      <div className="sidebarLayout">
        <Sidebar />

        <form onSubmit={onSubmit} className="sidebarContainer">
          <NewPostForm
            post={post}
            postDispatch={postDispatch}
            setShowMap={setShowMap}
          />
          <RegularButton type="submit" style="full" text="Publier" />
        </form>
      </div>
      <Modal show={showMap} setShow={setShowMap} title="Localisation">
        <DisplayLocation
          position={post.position}
          dispatch={postDispatch}
          setShowMap={setShowMap}
        />
      </Modal>
    </>
  );
};
export default withAuth(NewPost);
