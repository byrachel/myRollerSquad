import { PostInterface } from "../entities/PostInterface";

export interface PostRepositoryInterface {
  getPosts(): Promise<PostInterface[]>;
}
