import React, { SyntheticEvent, useReducer, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Sidebar from "@/components/flow/addPost/Sidebar";
import RegularButton from "@/components/buttons/RegularButton";
import DisplayLocation from "@/components/flow/addPost/DisplayLocation";
import Modal from "@/components/layouts/Modal";
import { PostReducer } from "app/reducers/PostReducer";
import { NewPostFactory } from "@/components/flow/addPost/utils/NewPostFactory";
import { newPostInitialState } from "@/components/flow/addPost/utils/newPostInitialState";
import NewPostForm from "@/components/flow/addPost/NewPostForm";
import { UserInterface } from "app/interfaces/userInterfaces";
import withAuth from "app/utils/withAuth";

interface Props {
  user: UserInterface;
}

const NewPost = ({ user }: Props) => {
  const router = useRouter();

  const [post, postDispatch] = useReducer(PostReducer, newPostInitialState);
  const [showMap, setShowMap] = useState(false);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

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
        user_id: user.id,
        title: target.title.value,
        content: post.content,
        price: target.price && target.price.value ? target.price.value : null,
        category_id: post.category,
        style_id: post.style,
        link: target.link && target.link.value ? target.link.value : null,
        duration:
          target.duration && target.duration.value
            ? target.duration.value
            : null,
        distance:
          target.distance && target.distance.value
            ? parseInt(target.distance.value)
            : null,
        position: post.position ? post.position : null,
        country: post.country ? post.country : null,
        squad_ids: [],
      };

      const newPostFactory = new NewPostFactory();
      const newPostToSave = newPostFactory.create(newPost);

      console.log("post to save : ", newPostToSave);

      const data = new FormData();

      for (const [key, value] of Object.entries(newPostToSave)) {
        data.append(key, value);
      }

      for (const image of post.pictures) {
        data.append("pictures", image);
      }

      const token = localStorage.getItem("token");

      axios({
        method: "post",
        url: "/api/flow",
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
      <div className="newPostSpaceBetween">
        <Sidebar />

        <form onSubmit={onSubmit} className="newPostContainer">
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
