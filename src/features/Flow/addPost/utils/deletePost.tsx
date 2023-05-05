import axios from "axios";

export const deletePost = (id: number, redirect: any) => {
  axios({
    method: "delete",
    url: `/api/flow/post/delete/${id}`,
    withCredentials: true,
  }).then(() => redirect());
};
