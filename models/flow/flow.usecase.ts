import { PostInterface } from "models/entities/flow.entity";

export interface ResponseInterface {
  status: string;
  errorMessage?: string;
  post?: any;
}

export interface FlowUseCase {
  getAllPosts(): Promise<PostInterface[]>;
  createPost(data: any): Promise<ResponseInterface>;
  // updatePost(data: any): Promise<ResponseInterface>;
  deletePost(postid: number, userid: number): Promise<ResponseInterface>;
}
