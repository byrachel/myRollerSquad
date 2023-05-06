import React from "react";
import Image from "next/image";

interface Props {
  pictures: string[];
  dispatch: React.Dispatch<any>;
}

export default function EditUploadedPicturesPreview({
  pictures,
  dispatch,
}: Props) {
  const removePict = (picture: string) => {
    const newListOfPictures = pictures.filter((pict) => pict !== picture);
    dispatch({
      type: "SAVE_ONLY_THIS_INITIAL_PICTURES",
      payload: newListOfPictures,
    });
  };
  return (
    <>
      {pictures.length > 0 ? (
        <div className="pictsPreviewContainer">
          {pictures.map((picture: string, idx: number) => (
            <div key={idx} className="pictPreview">
              <Image
                src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${picture}`}
                alt="Image initialement publiée"
                className="pict"
                width={160}
                height={160}
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
