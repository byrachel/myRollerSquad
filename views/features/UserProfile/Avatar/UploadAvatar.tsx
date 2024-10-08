import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import RegularButton from "views/components/buttons/RegularButton";
import ErrorLayout from "views/components/layouts/ErrorLayout";
import Loader from "views/components/layouts/Loader";
import { useProfile } from "views/hooks/useProfile";

interface Props {
  avatar: {
    file: any;
    width: number;
    height: number;
  } | null;
  setDisplayNewAvatar: (arg: boolean) => void;
  userId: number;
}

export default function UploadAvatar({
  avatar,
  setDisplayNewAvatar,
  userId,
}: Props) {
  const [uploadError, setUploadError] = useState({
    status: false,
    message: "",
  });
  const router = useRouter();
  const { updateUserProfile } = useProfile((state) => ({
    updateUserProfile: state.updateUserProfile,
  }));

  const saveThisAvatar = () => {
    setUploadError({ status: false, message: "" });
    if (!avatar || !avatar.file)
      return setUploadError({
        status: true,
        message: "Veuillez sélectionner une image",
      });

    if (userId) {
      const data = new FormData();
      data.append("avatar", avatar.file);
      axios({
        method: "put",
        url: `/api/user/avatar`,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          updateUserProfile(res.data.user);
          setDisplayNewAvatar(false);
        })
        .catch(() => {
          setUploadError({
            status: true,
            message: `Une erreur s'est produite. L'image n'a pu être sauvegardée.`,
          });
        });
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <div className="mt5">
      {avatar ? (
        <>
          <div className="center">
            <Image
              src={avatar.file.preview}
              alt="Roller Quad"
              className="uploadRollerSkaterAvatar"
              width={avatar.width}
              height={avatar.height}
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
              onClick={saveThisAvatar}
              style="full"
            />
          </div>
        </>
      ) : (
        <Loader text={"Hey ! Jolie photo en chargement !"} />
      )}
    </div>
  );
}
