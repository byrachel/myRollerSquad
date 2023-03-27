import sharp from "sharp";
import { Request, Response } from "express";
import { CreatePostUseCase } from "server/core/use-cases/Flow/createPost";
import { GetPostUseCase } from "../use-cases/Flow/getPost";
import { GetPostsUseCase } from "../use-cases/Flow/getPosts";
import { PostInterface } from "../entities/PostInterface";
import { uploadImage } from "../../infrastructure/middleware/imageUpload";

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
  async addPost(req: Request, res: Response): Promise<PostInterface | null> {
    const files: any = req.files;
    const resizedImages = [];

    console.log("FILES", files);

    if (files) {
      for (const file of files) {
        const buffer = await sharp(file.buffer)
          .resize({ width: 700 })
          .toBuffer();

        if (!process.env.S3_FLOW_BUCKET_NAME) return null;

        const image = await uploadImage(
          process.env.S3_FLOW_BUCKET_NAME,
          file,
          buffer
        );

        if (!image || !image.Key) {
          return null;
        }
        resizedImages.push(image.Key);
      }
    }

    try {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
        category_id: parseInt(req.body.category_id),
        user_id: parseInt(req.body.user_id),
        style_id:
          req.body.style_id === "null" ? null : parseInt(req.body.style_id),
        link: req.body.link === "null" ? null : req.body.link,
        duration:
          !req.body.duration || req.body.duration === "null"
            ? null
            : req.body.duration,
        distance:
          !req.body.distance || req.body.distance === "null"
            ? null
            : req.body.distance,
        hashtags: req.body.hashtags ? req.body.hashtags : [],
        pictures: resizedImages,
        squad_ids: req.body.squad_ids ? req.body.squad_ids : [],
        created_at: new Date().toISOString(),
        country: req.body.country ? req.body.country : "France",
      };

      const post = await this.createPostUseCase.execute(newPost);

      return post;
    } catch (err) {
      return null;
    }
  }
}
