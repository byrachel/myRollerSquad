import React, { SyntheticEvent, useReducer } from "react";
import Image from "next/image";

import * as category from "app/constants/PostCategories";
import { rollerSkateStyles } from "app/constants/RollerSkateStyles";
import { flowReducer } from "app/reducers/flowReducer";
import { uploadPictsWithPreview } from "app/utils/uploadPictsWithPreview";

import Camera from "app/svg/add-media-image.svg";
import Map from "app/svg/pin-alt.svg";

import RegularButton from "@/components/buttons/RegularButton";
import { NewPostInterface } from "app/interfaces/flowInterfaces";
import { cardColor } from "app/utils/colorManager";
import UploadedPicturesPreview from "@/components/layouts/UploadedPicturesPreview";
import DisplayLocation from "@/components/flow/addPost/DisplayLocation";

export default function newpost() {
  const initialState = {
    loading: false,
    error: { status: false, message: null, input: null },
    category: category.STORY,
    style: null,
    city: null,
    country: "France",
    pictures: [],
    squad: [],
    displayLocation: false,
  } as NewPostInterface;

  const [post, postDispatch] = useReducer(flowReducer, initialState);

  console.log("newPost", post);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      content: { value: string };
      link: { value: string };
      price: { value?: number };
      duration: { value?: number };
      distance: { value?: number };
    };

    if (!target.title.value) {
      return postDispatch({
        type: "TITLE_ERROR",
        payload: true,
      });
    }

    console.log(target.title.value);
    console.log(target.price ? target.price.value : 0);
  };

  return (
    <>
      <div className="coloredSeparator" />
      <div className="newPostSpaceBetween">
        <Image
          src="/img/pexels-airam-datoon-rollerskater.jpg"
          alt="Patins à roulettes au Skate Park"
          width={768}
          height={724}
          className="newPostSidebardPict"
        />

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
            <div className="flexStartNoWrap">
              <label htmlFor="fileInput" className="flowFileInput">
                <Camera className="fileInputIcon" width={40} height={40} />
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
                width={40}
                height={40}
                onClick={() =>
                  postDispatch({ type: "DISPLAY_LOCATION", payload: true })
                }
              />
            </div>
          </div>

          {post.displayLocation ? <DisplayLocation /> : null}

          <UploadedPicturesPreview
            pictures={post.pictures}
            dispatch={postDispatch}
          />

          <label htmlFor="textarea">
            {post.category === category.SALE ? "Description" : "Message"}
          </label>
          <textarea className="input" name="content" id="textarea" rows={3} />

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
    </>
  );
}
