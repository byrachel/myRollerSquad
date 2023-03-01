import { Request, Response } from "express";
import { CreatePostUseCase } from "server/use-cases/Flow/createPost";
import { GetPostsUseCase } from "../../use-cases/Flow/getPosts";
import { validationResult } from "express-validator";

export class PostController {
  private getPostsUseCase: GetPostsUseCase;
  private createPostUseCase: CreatePostUseCase;

  constructor(
    getPostsUseCase: GetPostsUseCase,
    createPostUseCase: CreatePostUseCase
  ) {
    this.getPostsUseCase = getPostsUseCase;
    this.createPostUseCase = createPostUseCase;
  }
  async getPosts(): Promise<any> {
    try {
      //   const cursor = req.params.cursor ? parseInt(req.params.cursor) : 0;
      const posts = await this.getPostsUseCase.execute();
      return posts;
    } catch (err) {
      return null;
    }
  }
  async addPost(req: Request, res: Response): Promise<any> {
    // const errors = validationResult(req);

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
        position.length === 2
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
    console.log("controller NEWpost before AWAIT");

    const post = await this.createPostUseCase.execute(newPost);
    console.log("controller post created ?> ", post);
    return post;
  }
}
