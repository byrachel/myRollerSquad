import React, { SyntheticEvent, useReducer, useRef, useState } from "react";

import * as category from "app/constants/PostCategories";
import { rollerSkateStyles } from "app/constants/RollerSkateStyles";
import { uploadPictsWithPreview } from "app/utils/uploadPictsWithPreview";

import Camera from "app/svg/add-media-image.svg";
import Map from "app/svg/pin-alt.svg";
import Pin from "app/svg/pin.svg";

import RegularButton from "@/components/buttons/RegularButton";
import { NewPostInterface } from "app/interfaces/flowInterfaces";
import { cardColor } from "app/utils/colorManager";
import UploadedPicturesPreview from "@/components/layouts/UploadedPicturesPreview";
import DisplayLocation from "@/components/flow/addPost/DisplayLocation";
import Modal from "@/components/layouts/Modal";
import Editor from "@/components/Editor/Editor";
import axios from "axios";
import { PostReducer } from "app/reducers/PostReducer";
import { NewPostFactory } from "@/components/flow/addPost/NewPostFactory";

export default function newpost() {
  const quillRef = useRef(null);

  const initialState = {
    loading: false,
    error: { status: false, message: null, input: null },
    category: category.STORY,
    style: 0,
    city: null,
    country: "France",
    pictures: [],
    squad: [],
    displayLocation: false,
    position: undefined,
    content: "",
  } as NewPostInterface;

  const [post, postDispatch] = useReducer(PostReducer, initialState);
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
        user_id: 1,
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
        .then(resp => console.log("OK >>> ", resp))
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <div className="coloredSeparator" />
      <div className="newPostSpaceBetween">
        <div className="newPostSidebar">
          <div className="newPostSidebarText">
            <h2>Quoi de beau à partager aujourd'hui ?</h2>
            <ul>
              <li>Un tuto ou une astuce ?</li>
              <li>Votre joli set-up !</li>
              <li>La recherche d'autres pratiquants dans votre région ?</li>
              <li>L'envie d'organiser un RDV au skatepark ?</li>
              <li>...</li>
            </ul>
            <p className="meta">
              myRollerSquad est une communauté active & bienveillante de
              passionnés de roller quad.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="newPostContainer">
          <div className="flexStart">
            {category.flowCategories.map(category => (
              <div
                key={category.id}
                className={
                  category.id === post.category
                    ? `badge ${cardColor(category.id)}`
                    : "outlineBadge grey"
                }
                onClick={() =>
                  postDispatch({
                    type: "SAVE_CATEGORY",
                    payload: category.id,
                  })
                }
              >
                {category.name}
              </div>
            ))}
          </div>

          <div className="spaceBetween">
            <div style={{ width: "100%" }}>
              <label htmlFor="text">Titre</label>
              <input
                className={
                  post.error.input === "title" ? "input error" : "input"
                }
                name="title"
                id="text"
                type="text"
                required
                min-length="3"
                max-length="50"
              />
            </div>
            <div className="flexStartNoWrap mt5">
              <label htmlFor="fileInput" className="flowFileInput">
                <Camera className="fileInputIcon" width={42} height={42} />
                <input
                  id="fileInput"
                  className="input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={e => uploadPictsWithPreview(e, postDispatch)}
                />
              </label>

              <Map
                className="newPostPinIcon"
                width={42}
                height={42}
                onClick={() => setShowMap(true)}
              />
            </div>
          </div>

          <UploadedPicturesPreview
            pictures={post.pictures}
            dispatch={postDispatch}
          />

          {post.country ? (
            <p className="meta mt5">
              <Pin width={12} height={12} className="metaIcon" />
              {post.country}
            </p>
          ) : null}

          <label>
            {post.category === category.SALE ? "Description" : "Message"}
          </label>
          <Editor
            content={post.content}
            dispatchContent={postDispatch}
            quillRef={quillRef}
          />

          {post.category === category.STORY ? (
            <div className="spaceBetween">
              <div style={{ width: "100%", marginRight: 5 }}>
                <label htmlFor="distance">Distance (km)</label>
                <input
                  className="input"
                  name="distance"
                  id="distance"
                  type="number"
                />
              </div>
              <div style={{ width: "100%", marginLeft: 5 }}>
                <label>Durée</label>
                <input
                  className="input"
                  name="duration_hour"
                  id="duration"
                  type="time"
                />
              </div>
            </div>
          ) : null}

          {post.category === category.SALE ? (
            <>
              <label htmlFor="price">Prix (€)</label>
              <input className="input" name="price" id="price" type="number" />
            </>
          ) : (
            <>
              <label>Choisis ton style</label>
              <div className="flexStart">
                {rollerSkateStyles.map(style => (
                  <div
                    key={style.id}
                    className={
                      style.id === post.style
                        ? "badge blue"
                        : "outlineBadge grey"
                    }
                    onClick={() =>
                      postDispatch({
                        type: "SAVE_STYLE",
                        payload: style.id,
                      })
                    }
                  >
                    {style.name}
                  </div>
                ))}
              </div>
              <label htmlFor="link">Lien</label>
              <input className="input" name="link" id="link" type="url" />
            </>
          )}

          {/* <div className="select">
          <select
            id="standard-select"
            onChange={e => {
              postDispatch({
                type: "SAVE_STYLE",
                payload: e.target.value,
              });
            }}
          >
            <option>Choisis ton style</option>
            {rollerSkateStyles.map(style => (
              <option key={style.id} value={style.id}>
                {style.name}
              </option>
            ))}
          </select>
          <span className="focus"></span>
        </div> */}

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
}
