import React from "react";
import { useRouter } from "next/router";

import * as category from "src/constants/PostCategories";
import { rollerSkateStyles } from "src/constants/RollerSkateStyles";
import UploadedPicturesPreview from "src/components/layouts/UploadedPicturesPreview";
import Editor from "@/components/form/Editor/Editor";
import EditUploadedPicturesPreview from "src/components/layouts/EditUploadedPicturesPreview";
import InputText from "src/components/form/InputText";
import DisplayMapContainer from "./DisplayMapContainer";
import SelectCategory from "./SelectCategory";
import { uploadPictsWithPreview } from "src/utils/uploadPictsWithPreview";
import { onSubmitNewPost, onSubmitEditedPost } from "./utils/onSubmitNewPost";

import Camera from "src/svg/add-media-image.svg";
import BigButton from "src/components/buttons/BigButton";
import HandleLocation from "./HandleLocation";
import { State, useUser } from "src/hooks/useUser";
import { shallow } from "zustand/shallow";

interface Props {
  userConnectedId: number;
  post: any;
  postDispatch: React.Dispatch<any>;
  editMode: boolean;
  isPro: boolean;
}

export default function NewPostForm({
  userConnectedId,
  post,
  postDispatch,
  editMode,
  isPro,
}: Props) {
  const router = useRouter();

  const { userName, userPlaces } = useUser(
    (state: State) => ({
      userName: state.userName,
      userPlaces: state.userPlaces,
    }),
    shallow
  );

  return (
    <>
      <form
        onSubmit={(e) =>
          editMode
            ? onSubmitEditedPost(e, userConnectedId, post, postDispatch, router)
            : onSubmitNewPost(e, userConnectedId, post, postDispatch, router)
        }
      >
        <SelectCategory
          postCategory={post.category}
          postDispatch={postDispatch}
        />
        {isPro && userPlaces && userPlaces.length > 0 && !editMode ? (
          <>
            <label htmlFor="author">Publié en tant que :</label>
            <div className="select">
              <select id="author" name="author" defaultValue={post.place_id}>
                <option value={userConnectedId}>{userName}</option>
                {userPlaces.map((elt: { id: number; name: string }) => (
                  <option key={elt.id} value={elt.id}>
                    {elt.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : null}
        <div className="spaceBetween">
          <div style={{ width: "100%" }}>
            <InputText
              label="Titre"
              placeholder="Titre"
              name="title"
              minLength={3}
              maxLength={30}
              value={post.title}
              error={post.error.input === "title"}
              required
            />
          </div>
          {editMode ? null : (
            <div className="imageAndPinIcons">
              <label htmlFor="fileInput">
                <Camera className="fileInputIcon" width={45} height={45} />
                <input
                  id="fileInput"
                  className="input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => uploadPictsWithPreview(e, postDispatch)}
                />
              </label>
              <DisplayMapContainer postDispatch={postDispatch} />
            </div>
          )}
        </div>

        <UploadedPicturesPreview
          pictures={post.pictures}
          error={post.error}
          dispatch={postDispatch}
        />

        {editMode ? (
          <EditUploadedPicturesPreview
            pictures={post.initialPictures}
            dispatch={postDispatch}
          />
        ) : null}

        <HandleLocation
          country={post.country}
          county={post.county}
          city={post.city}
        />

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
                value={post.distance}
              />
            </div>
            <div style={{ width: "100%", marginLeft: 5 }}>
              <label htmlFor="duration_hour">Durée</label>
              <input
                className="input"
                name="duration_hour"
                id="duration"
                type="time"
                value={post.duration}
              />
            </div>
          </div>
        ) : null}

        {post.category === category.SALE ? (
          <>
            <label htmlFor="price">Prix (€)</label>
            <input
              className="input"
              name="price"
              id="price"
              type="number"
              value={post.price}
            />
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
            <input
              className="input"
              name="link"
              id="link"
              type="url"
              defaultValue={post.link}
            />
          </>
        )}
        <div className="mt5" />
        <BigButton type="submit" style="full" text="Publier" />
      </form>
    </>
  );
}
