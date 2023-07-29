import { PostInterface } from "models/entities/flow.entity";

export interface ResponseInterface {
  status: string;
  posts: PostInterface[];
  cursor: number | null;
}

export interface FlowUseCase {
  getPosts(
    nextId: number,
    category: string,
    style: string
  ): Promise<ResponseInterface>;
}
