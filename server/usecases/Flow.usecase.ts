import {
  BodyPostInterface,
  CompletePostInterface,
  GetPostsResponseInterface,
  UserPostInterface,
} from "models/entities/flow.entity";

export interface FlowUseCase {
  createPost: (
    user_id: number,
    data: BodyPostInterface,
    files: any[]
  ) => Promise<CompletePostInterface | null>;
  addPicturesToPost: (
    post_id: number,
    files: any[]
  ) => Promise<UserPostInterface | null>;
  updatePost: (
    post_id: number,
    data: BodyPostInterface
  ) => Promise<CompletePostInterface | null>;
  deletePost: (id: number) => Promise<{ deleted: boolean } | null>;
  getPosts: (
    cursor: number,
    category_id: number | null,
    style_id: number | null
  ) => Promise<GetPostsResponseInterface | null>;
  getUserPosts: (user_id: number) => Promise<UserPostInterface[] | null>;
  getUserLatestPosts: (user_id: number) => Promise<UserPostInterface[] | null>;
  getPlaceLatestPosts: (
    place_id: number
  ) => Promise<UserPostInterface[] | null>;
  getPostById: (post_id: number) => Promise<CompletePostInterface | null>;
  addOrRemoveLike: (
    user_id: number,
    post_id: number
  ) => Promise<{ liked: boolean } | null>;
}
