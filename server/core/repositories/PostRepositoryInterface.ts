import { CreatePostInterface, PostInterface } from "../entities/PostInterface";

export interface PostRepositoryInterface {
  getPosts(): Promise<PostInterface[]>;
  createPost(post: CreatePostInterface): Promise<PostInterface>;
}
