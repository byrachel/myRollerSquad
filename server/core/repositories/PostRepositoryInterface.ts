import { CreatePostInterface, PostInterface } from "../entities/PostInterface";

export interface PostRepositoryInterface {
  getPosts(cursor: number, limit: number): Promise<PostInterface[]>;
  createPost(post: CreatePostInterface): Promise<PostInterface | null>;
  getPost(id: number): Promise<PostInterface | null>;
}
