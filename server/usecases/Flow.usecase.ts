import {
  BodyPostInterface,
  CompletePostInterface,
  GetPostsResponseInterface,
  UserPostInterface,
} from "src/entities/flow.entity";

export interface FlowUseCase {
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
  addOrRemoveLike: (
    user_id: number,
    post_id: number
  ) => Promise<{ liked: boolean } | null>;
  getPostById: (post_id: number) => Promise<CompletePostInterface | null>;
  updatePost: (
    post_id: number,
    data: BodyPostInterface
  ) => Promise<CompletePostInterface | null>;
  //   createPost: (data: PostInterface) => Promise<PostInterface | null>;
  deletePost: (id: number) => Promise<{ deleted: boolean } | null>;
}
