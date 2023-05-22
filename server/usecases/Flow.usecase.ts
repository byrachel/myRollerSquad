import { PostInterface } from "client/entities/flow.entity";

export interface FlowUseCase {
  getPosts: (
    cursor: number,
    category?: string,
    style?: string
  ) => Promise<PostInterface[]>;
  updatePost: (data: PostInterface) => Promise<PostInterface>;
  createPost: (data: PostInterface) => Promise<PostInterface>;
  deletePost: (id: number) => Promise<void>;
}
