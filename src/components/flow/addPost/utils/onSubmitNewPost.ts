import axios from "axios";
import { Dispatch, SyntheticEvent } from "react";
import { NewPostInterface } from "src/interfaces/flowInterfaces";
import { NewPostFactory } from "./NewPostFactory";

export const onSubmitNewPost = async (
  event: SyntheticEvent,
  userConnectedId: number,
  post: NewPostInterface,
  postDispatch: Dispatch<any>,
  router: any
) => {
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
      user_id: userConnectedId,
      title: target.title.value,
      content: post.content,
      price: target.price && target.price.value ? target.price.value : null,
      category_id: post.category,
      style_id: post.style ? post.style : null,
      link: target.link && target.link.value ? target.link.value : null,
      duration:
        target.duration && target.duration.value ? target.duration.value : null,
      distance:
        target.distance && target.distance.value
          ? parseFloat(target.distance.value)
          : null,
      //   position: post.position ? post.position : null,
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

    // console.log("NEW POST", Object.fromEntries(data));

    axios({
      method: "post",
      url: `/api/flow/post/add`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then(res => router.push(`/post/${res.data.post.id}`))
      .catch(err => console.log(err));
  }
};
