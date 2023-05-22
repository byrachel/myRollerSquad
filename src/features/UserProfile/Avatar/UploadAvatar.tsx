import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import RegularButton from "src/components/buttons/RegularButton";
import ErrorLayout from "src/components/layouts/ErrorLayout";
import Loader from "src/components/layouts/Loader";
import { useProfile } from "src/hooks/useProfile";
import { useUser } from "src/hooks/useUser";

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
  const { updateAvatar } = useUser((state) => ({
    updateAvatar: state.updateAvatar,
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
          updateAvatar(res.data.user.avatar);
          setDisplayNewAvatar(false);
        })
        .catch(() => {
          setUploadError({
            status: true,
            message: `Une erreur s'est produite. L'image n'a pu être sauvegardée.`,
          });
        });
    } else {
      router.push("/signin");
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
