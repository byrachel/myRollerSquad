import React from "react";

import * as category from "app/constants/PostCategories";
import { rollerSkateStyles } from "app/constants/RollerSkateStyles";
import { uploadPictsWithPreview } from "app/utils/uploadPictsWithPreview";

import Camera from "app/svg/add-media-image.svg";
import Map from "app/svg/pin-alt.svg";
import Pin from "app/svg/pin.svg";

import { cardColor } from "app/utils/colorManager";
import UploadedPicturesPreview from "@/components/layouts/UploadedPicturesPreview";
import Editor from "@/components/Editor/Editor";

interface Props {
  post: any;
  postDispatch: React.Dispatch<any>;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewPostForm({ post, postDispatch, setShowMap }: Props) {
  return (
    <>
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
            className={post.error.input === "title" ? "input error" : "input"}
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
      <Editor content={post.content} dispatchContent={postDispatch} />

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
                  style.id === post.style ? "badge blue" : "outlineBadge grey"
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
    </>
  );
}
