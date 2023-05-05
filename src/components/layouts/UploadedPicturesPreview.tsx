import React from "react";
import Image from "next/image";

import { UploadedPictureInterface } from "src/interfaces/flowInterfaces";

interface Props {
  pictures: UploadedPictureInterface[];
  dispatch: React.Dispatch<any>;
}

export default function UploadedPicturesPreview({ pictures, dispatch }: Props) {
  const removePict = (picture: UploadedPictureInterface) => {
    const newListOfPictures = pictures.filter(
      (pict) => pict.name !== picture.name
    );
    dispatch({ type: "SAVE_ONLY_THIS_PICTURES", payload: newListOfPictures });
    if (picture.name === "map.png") {
      dispatch({ type: "SAVE_MAP", payload: null });
    }
  };
  return (
    <>
      {pictures.length > 0 ? (
        <div className="pictsPreviewContainer">
          {pictures.map((picture: UploadedPictureInterface, idx: number) => (
            <div key={idx} className="pictPreview">
              <Image
                src={picture.preview}
                alt={picture.name}
                className="pict"
                width={1}
                height={1}
              />
              <div
                role="button"
                tabIndex={0}
                className="removePictIcon"
                onClick={() => removePict(picture)}
                onKeyDown={() => removePict(picture)}
              >
                X
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
