import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

import RegularButton from "views/components/buttons/RegularButton";
import ErrorLayout from "views/components/layouts/ErrorLayout";
import Loader from "views/components/layouts/Loader";
import { PlaceInterface } from "models/entities/business.entity";

interface Props {
  logo: {
    file: any;
    width: number;
    height: number;
  } | null;
  setDisplayNewLogo: (arg: boolean) => void;
  updateUserPlace: (place: PlaceInterface) => void;
  placeId: number;
  userId: number;
}

export default function UploadLogo({
  logo,
  setDisplayNewLogo,
  updateUserPlace,
  placeId,
  userId,
}: Props) {
  const [uploadError, setUploadError] = useState({
    status: false,
    message: "",
  });

  const saveThisLogo = () => {
    setUploadError({ status: false, message: "" });
    if (!logo || !logo.file)
      return setUploadError({
        status: true,
        message: "Veuillez sélectionner une image",
      });

    if (placeId) {
      const data = new FormData();
      data.append("logo", logo.file);
      axios({
        method: "put",
        url: `/api/business/logo/${placeId}/${userId}`,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          updateUserPlace(res.data.place);
          setDisplayNewLogo(false);
        })
        .catch(() => {
          setUploadError({
            status: true,
            message: `Une erreur s'est produite. L'image n'a pu être sauvegardée.`,
          });
        });
    }
  };

  return (
    <div className="mt5">
      {logo ? (
        <>
          <div className="center">
            <Image
              src={logo.file.preview}
              alt="Roller Quad Business logo"
              className="uploadRollerBusinessLogo"
              width={logo.width}
              height={logo.height}
            />
          </div>
          {uploadError ? (
            <ErrorLayout
              error={uploadError.status}
              message={uploadError.message}
              setError={setUploadError}
            />
          ) : (
            <br />
          )}
          <div className="center">
            <RegularButton
              text="Enregistrer"
              type="button"
              onClick={saveThisLogo}
              style="outline"
            />
          </div>
        </>
      ) : (
        <Loader text={"Logo en cours de chargement !"} />
      )}
    </div>
  );
}
