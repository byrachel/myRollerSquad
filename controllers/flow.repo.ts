import { FlowUseCase, ResponseInterface } from "../models/flow/flow.usecase";
import { PostInterface } from "models/entities/flow.entity";
import axios from "axios";
import http from "views/utils/interceptor/http";

export class FlowRepository implements FlowUseCase {
  async createPost(post: any): Promise<ResponseInterface> {
    const newPost = axios({
      method: "post",
      url: `/api/flow/post/add/post`,
      data: post,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res: any) => {
        return { status: "SUCCESS", post: res.data.post };
      })
      .catch((err) => {
        return { status: "ERROR", errorMessage: err.response.data.message };
      });

    return newPost;
  }

  async deletePost(postid: number, userid: number): Promise<ResponseInterface> {
    const postIsDeleted = http({
      method: "delete",
      url: `flow/post/delete/${postid}/${userid}`,
      withCredentials: true,
    })
      .then(() => {
        return { status: "SUCCESS" };
      })
      .catch((err) => {
        return { status: "ERROR", errorMessage: err.response.data.message };
      });
    return postIsDeleted;
  }

  async getAllPosts(): Promise<PostInterface[]> {
    return [];
  }
}
