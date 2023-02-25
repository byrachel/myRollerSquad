import React from "react";
import Image from "next/image";

import { UploadedPictureInterface } from "app/interfaces/flowInterfaces";

interface Props {
  pictures: UploadedPictureInterface[];
  dispatch: React.Dispatch<any>;
}

export default function UploadedPicturesPreview({ pictures, dispatch }: Props) {
  const removePict = (picture: UploadedPictureInterface) => {
    const newListOfPictures = pictures.filter(
      pict => pict.name !== picture.name
    );
    dispatch({ type: "SAVE_PICTURES", payload: newListOfPictures });
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
                className="removePictIcon"
                onClick={() => removePict(picture)}
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
