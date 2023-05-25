import axios from "axios";

export const deletePost = (userId: number, postId: number, redirect: any) => {
  axios({
    method: "delete",
    url: `/api/flow/post/delete/${postId}/${userId}`,
    withCredentials: true,
  }).then(() => redirect());
};
