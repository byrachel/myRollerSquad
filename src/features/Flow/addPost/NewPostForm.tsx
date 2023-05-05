import React from "react";
import { useRouter } from "next/router";

import * as category from "src/constants/PostCategories";
import { rollerSkateStyles } from "src/constants/RollerSkateStyles";
import UploadedPicturesPreview from "@/components/layouts/UploadedPicturesPreview";
import Editor from "@/components/form/Editor/Editor";
import RegularButton from "@/components/buttons/RegularButton";
import { uploadPictsWithPreview } from "src/utils/uploadPictsWithPreview";
import { onSubmitNewPost } from "./utils/onSubmitNewPost";

import Camera from "src/svg/add-media-image.svg";
import Map from "src/svg/pin-alt.svg";
import Pin from "src/svg/pin.svg";

interface Props {
  userConnectedId: number;
  post: any;
  postDispatch: React.Dispatch<any>;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewPostForm({
  userConnectedId,
  post,
  postDispatch,
  setShowMap,
}: Props) {
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={(e) =>
          onSubmitNewPost(e, userConnectedId, post, postDispatch, router)
        }
      >
        <div className="flexStart">
          {category.flowCategories.map((category) => (
            <div
              role="button"
              key={category.id}
              tabIndex={0}
              className={
                category.id === post.category
                  ? `badge pink`
                  : "outlineBadge grey"
              }
              onClick={() =>
                postDispatch({
                  type: "SAVE_CATEGORY",
                  payload: category.id,
                })
              }
              onKeyDown={() =>
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
              maxLength={30}
              required
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
                onChange={(e) => uploadPictsWithPreview(e, postDispatch)}
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
          placeholder="Quoi de beau à partager aujourd'hui ?"
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
                step=".01"
              />
            </div>
            <div style={{ width: "100%", marginLeft: 5 }}>
              <label htmlFor="duration_hour">Durée</label>
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
        ) : null}
        <label htmlFor="rollerStyle">Choisis ton style</label>
        <div className="flexStart">
          {rollerSkateStyles.map((style) => (
            <div
              key={style.id}
              role="button"
              className={
                post.style.includes(style.id)
                  ? `badge blue`
                  : "outlineBadge grey"
              }
              onClick={() =>
                postDispatch({
                  type: "SAVE_STYLE",
                  payload: style.id,
                })
              }
              onKeyDown={() =>
                postDispatch({
                  type: "SAVE_STYLE",
                  payload: style.id,
                })
              }
              tabIndex={0}
            >
              {style.name}
            </div>
          ))}
        </div>
        {post.category === category.SALE ? null : (
          <>
            <label htmlFor="link">Lien</label>
            <input className="input" name="link" id="link" type="url" />
          </>
        )}
        <RegularButton type="submit" style="full" text="Publier" />
      </form>
    </>
  );
}
