import axios from "axios";
import { Dispatch, SyntheticEvent } from "react";
import {
  EditPostInterface,
  NewPostInterface,
} from "models/entities/flow.entity";
import { NewPostFactory } from "./NewPostFactory";
import { FlowRepository } from "controllers/flow.repo";

export const onSubmitNewPost = async (
  event: SyntheticEvent,
  userConnectedId: number,
  post: NewPostInterface,
  postDispatch: Dispatch<any>,
  router: any
) => {
  event.preventDefault();

  postDispatch({
    type: "LOADING",
    payload: true,
  });

  const target = event.target as typeof event.target & {
    title: { value: string };
    link: { value: string };
    price: { value?: number };
    duration: { value?: number };
    distance: { value?: string };
    author?: { value: string };
  };

  if (!target.title.value) {
    return postDispatch({
      type: "TITLE_ERROR",
      payload: true,
    });
  }

  if (post.pictures.length > 5)
    return postDispatch({
      type: "PICTURES_LENGTH_ERROR",
      payload: true,
    });

  const newPost = {
    user_id: userConnectedId,
    title: target.title.value,
    content: post.content,
    price: target.price && target.price.value ? target.price.value : null,
    category_id: post.category,
    style_ids: post.style ? post.style : [],
    link: target.link && target.link.value ? target.link.value : null,
    duration:
      target.duration && target.duration.value
        ? `${target.duration.value}`
        : null,
    distance:
      target.distance && target.distance.value
        ? parseFloat(target.distance.value)
        : null,
    country: post.country ? post.country : null,
    county: post.county ? post.county : null,
    city: post.city ? post.city : null,
    squad_ids: [],
    pictures: [],
    place_id:
      target.author && target.author.value.split("_")[0] === "place"
        ? parseInt(target.author.value.split("_")[1])
        : null,
  };

  const newPostFactory = new NewPostFactory();
  const newPostToSave = newPostFactory.create(newPost);

  const data = new FormData();

  for (let [key, val] of Object.entries(newPostToSave)) {
    data.append(key, val);
  }
  if (post.map) {
    data.append("pictures", post.map, "map.png");
  }
  for (const image of post.pictures) {
    if (image.name !== "map.png") {
      data.append("pictures", image);
    }
  }

  const flowRepo = new FlowRepository();
  const postIsSaved = await flowRepo.createPost(data);

  if (postIsSaved.status === "SUCCESS") {
    router.push(`/post/${postIsSaved.post.id}`);
  } else {
    postDispatch({
      type: "ERROR",
      payload: postIsSaved.errorMessage
        ? postIsSaved.errorMessage
        : "Une erreur est survenue",
    });
  }
};

export const onSubmitEditedPost = async (
  event: SyntheticEvent,
  userConnectedId: number,
  post: EditPostInterface,
  postDispatch: Dispatch<any>,
  router: any
) => {
  event.preventDefault();

  postDispatch({
    type: "LOADING",
    payload: true,
  });

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
      user_id: userConnectedId,
      title: target.title.value,
      content: post.content,
      price: target.price && target.price.value ? target.price.value : null,
      category_id: post.category,
      style_ids: post.style ? post.style : [],
      link: target.link && target.link.value ? target.link.value : null,
      duration:
        target.duration && target.duration.value
          ? `${target.duration.value}`
          : null,
      distance:
        target.distance && target.distance.value
          ? parseFloat(target.distance.value)
          : null,
      country: post.country ? post.country : null,
      county: post.county ? post.county : null,
      city: post.city ? post.city : null,
      squad_ids: [],
      pictures: post.initialPictures,
      place_id: null,
    };

    const editedPostFactory = new NewPostFactory();
    const editedPostToSave = editedPostFactory.create(newPost);

    axios({
      method: "put",
      url: `/api/flow/post/update/${post.id}`,
      data: editedPostToSave,
      withCredentials: true,
    })
      .then(() => {
        const isUserBoard = router.pathname === "/profile/posts/[uid]";
        if (!isUserBoard)
          return router.push(`/profile/posts/${userConnectedId}`);
        router.push(`/post/${post.id}`);
      })
      .catch((err) => {
        postDispatch({
          type: "ERROR",
          payload: err.response.data.message,
        });
      });
  }
};
