import React, { useReducer } from "react";
import { PostInterface } from "models/entities/flow.entity";
import NewPostForm from "../addPost/NewPostForm";
import { PostReducer } from "views/reducers/PostReducer";

interface Props {
  postToEdit: PostInterface;
  userConnectedId: number;
}

export default function EditPost({ postToEdit, userConnectedId }: Props) {
  const initialState = {
    loading: false,
    error: { status: false, message: null, input: null },
    category: postToEdit.category_id,
    style: postToEdit.style.map((elt) => elt.style_id),
    city: postToEdit.city,
    county: postToEdit.county,
    country: postToEdit.country,
    pictures: [],
    initialPictures: postToEdit.pictures,
    squad: [],
    displayLocation: false,
    content: postToEdit.content,
    map: null,
    id: postToEdit.id,
    title: postToEdit.title,
    price: postToEdit.price,
    duration: postToEdit.duration,
    distance: postToEdit.distance,
    link: postToEdit.link,
    place_id: postToEdit.place_id,
  };
  const [post, postDispatch] = useReducer(PostReducer, initialState);

  return (
    <NewPostForm
      userConnectedId={userConnectedId}
      post={post}
      postDispatch={postDispatch}
      editMode
    />
  );
}
