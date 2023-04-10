import { Request } from "express";
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
  async addPost(req: Request): Promise<PostInterface | null> {
    const files: any = req.files;
    const resizedImages = [];
    try {
      for (const file of files) {
        if (process.env.S3_FLOW_BUCKET_NAME) {
          const image = await uploadImage(
            process.env.S3_FLOW_BUCKET_NAME,
            file
          );
          if (!image || !image.Key) {
            return null;
          }
          resizedImages.push(image.Key);
        }
      }

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
            : parseFloat(req.body.distance),
        hashtags: [],
        pictures: resizedImages,
        squad_ids: req.body.squad_ids ? req.body.squad_ids : [],
        created_at: new Date().toISOString(),
        country:
          req.body.country && req.body.city !== "null"
            ? req.body.country
            : "France",
        city: req.body.city && req.body.city !== "null" ? req.body.city : null,
        price:
          req.body.price && req.body.price !== "null"
            ? parseFloat(req.body.price)
            : null,
      };

      const post = await this.createPostUseCase.execute(newPost);
      return post;
    } catch (err) {
      return null;
    }
  }
}
