import {
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
  //   updatePost: (data: PostInterface) => Promise<PostInterface | null>;
  //   createPost: (data: PostInterface) => Promise<PostInterface | null>;
  //   deletePost: (id: number) => Promise<void>;
}
