import { Request, Response } from "express";
import { CreatePostUseCase } from "server/core/use-cases/Flow/createPost";
import { GetPostUseCase } from "../use-cases/Flow/getPost";
import { GetPostsUseCase } from "../use-cases/Flow/getPosts";
import { PostInterface } from "../entities/PostInterface";

export class PostController {
  private getPostsUseCase: GetPostsUseCase;
  private createPostUseCase: CreatePostUseCase;
  private getPostUseCase: GetPostUseCase;

  constructor(
    getPostsUseCase: GetPostsUseCase,
    createPostUseCase: CreatePostUseCase,
    getPostUseCase: GetPostUseCase
  ) {
    this.getPostsUseCase = getPostsUseCase;
    this.createPostUseCase = createPostUseCase;
    this.getPostUseCase = getPostUseCase;
  }
  async getPosts(cursor: number, limit: number): Promise<PostInterface[]> {
    const posts = await this.getPostsUseCase.execute(cursor, limit);
    return posts;
  }
  async getPost(id: number): Promise<PostInterface | null> {
    const post = await this.getPostUseCase.execute(id);
    return post;
  }
  async addPost(req: Request, res: Response): Promise<PostInterface> {
    const {
      title,
      content,
      hashtags,
      category_id,
      user_id,
      position,
      pictures,
      squad_ids,
      // city,
      style_id,
      link,
      duration,
      distance,
      country,
    } = req.body;

    const newPost = {
      title,
      content,
      category_id,
      user_id,
      location:
        position && position.length === 2
          ? {
              latitude: position[0],
              longitude: position[1],
            }
          : undefined,
      style_id,
      link,
      duration,
      distance,
      hashtags,
      pictures,
      squad_ids,
      created_at: new Date().toISOString(),
      country,
    };
    const post = await this.createPostUseCase.execute(newPost);
    return post;
  }
}
