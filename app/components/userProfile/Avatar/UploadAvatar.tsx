import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import { UserContext } from "app/context/UserContext";
import RegularButton from "app/components/buttons/RegularButton";
import ErrorLayout from "app/components/layouts/ErrorLayout";
import styles from "app/styles/Profile.module.scss";

interface Props {
  avatar: {
    file: any;
    width: number;
    height: number;
  } | null;
  setDisplayNewAvatar: (arg: boolean) => void;
  userProfileDispatch: React.Dispatch<any>;
}

export default function UploadAvatar({
  avatar,
  setDisplayNewAvatar,
  userProfileDispatch,
}: Props) {
  const [uploadError, setUploadError] = useState({
    status: false,
    message: "",
  });
  const { userState } = useContext(UserContext);
  const router = useRouter();

  const saveThisAvatar = () => {
    setUploadError({ status: false, message: "" });
    if (!avatar || !avatar.file)
      return setUploadError({
        status: true,
        message: "Veuillez sélectionner une impage",
      });
    const userId = userState.user?.id;
    const token = localStorage.getItem("token");

    if (token && userId) {
      const data = new FormData();
      data.append("avatar", avatar.file);
      data.append("userId", `${userId}`);
      axios({
        method: "put",
        url: `/api/user/avatar`,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(res => {
          userProfileDispatch({
            type: "USER_PROFILE_UPDATED",
            payload: res.data.user,
          });
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
              className={styles.uploadRollerSkaterAvatar}
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
        <div className="loader" />
      )}
    </div>
  );
}