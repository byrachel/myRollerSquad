import React, { useReducer } from "react";
import { PostInterface } from "src/interfaces/flowInterfaces";
import NewPostForm from "../addPost/NewPostForm";
import { PostReducer } from "src/reducers/PostReducer";

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
  };
  const [post, postDispatch] = useReducer(PostReducer, initialState);

  const setShowMap = () => {
    console.log("map");
  };
  return (
    <div>
      <NewPostForm
        userConnectedId={userConnectedId}
        post={post}
        postDispatch={postDispatch}
        setShowMap={setShowMap}
        editMode
      />
      {/* <Modal show={showMap} setShow={setShowMap} title="Localisation">
        <DisplayLocation dispatch={postDispatch} setShowMap={setShowMap} />
      </Modal> */}
    </div>
  );
}
