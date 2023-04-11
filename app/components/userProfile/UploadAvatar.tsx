import React from "react";
import Image from "next/image";
import styles from "../../styles/Profile.module.scss";
import RegularButton from "../buttons/RegularButton";
import axios from "axios";
import { API_URL } from "app/constants/URL";

interface Props {
  avatar: {
    file: any;
    width: number;
    height: number;
  } | null;
}

export default function UploadAvatar({ avatar }: Props) {
  const saveThisAvatar = () => {
    if (!avatar) return;
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("avatar", avatar.file);
    axios({
      method: "post",
      url: `${API_URL}/api/avatar`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(response => {
        //handle success
        console.log("OK", response);
      })
      .catch(response => {
        //handle error
        console.log("err", response);
      });
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
