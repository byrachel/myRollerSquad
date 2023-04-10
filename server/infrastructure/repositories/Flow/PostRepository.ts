import {
  CreatePostInterface,
  PostInterface,
} from "../../../core/entities/PostInterface";
import { PostRepositoryInterface } from "../../../core/repositories/PostRepositoryInterface";
import db from "../../prisma/db/client";
import { Prisma } from "@prisma/client";

export class PostRepository implements PostRepositoryInterface {
  async getPosts(cursor: number, limit: number): Promise<PostInterface[]> {
    try {
      const cursorObj = cursor === 0 ? undefined : { id: cursor };
      const posts = await db.post.findMany({
        skip: cursor > 0 ? 1 : 0,
        cursor: cursorObj,
        take: limit,
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          title: true,
          content: true,
          category_id: true,
          style_id: true,
          hashtags: true,
          created_at: true,
          pictures: true,
          link: true,
          // comments: true,
          user: true,
          squad_ids: true,
          city: true,
          country: true,
          user_likes: {
            select: {
              user_id: true,
            },
          },
          price: true,
          distance: true,
          duration: true,
        },
      });
      return posts;
    } catch (error) {
      // @eslint-ignore
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("Prisma Code Error = ", error);
        throw new Error("Les données ne sont pas accessibles pour le moment.");
      } else {
        throw new Error("Les données ne sont pas accessibles pour le moment.");
      }
    }
  }

  async createPost(post: CreatePostInterface): Promise<PostInterface | null> {
    try {
      const newPost = await db.post.create({
        data: {
          title: post.title,
          content: post.content,
          hashtags: post.hashtags,
          created_at: post.created_at,
          user_id: post.user_id,
          category_id: post.category_id,
          country: post.country,
          pictures: post.pictures,
          squad_ids: post.squad_ids,
          style_id: post.style_id === 0 ? null : post.style_id,
          link: post.link,
          distance: post.distance,
          duration: post.duration,
          price: post.price,
          city: post.city,
        },
      });
      return newPost;
    } catch (err) {
      console.log("NEW POST ERR", err);
      return null;
    }
  }

  async getPost(id: number): Promise<PostInterface | null> {
    const post = await db.post.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        category_id: true,
        style_id: true,
        hashtags: true,
        created_at: true,
        pictures: true,
        link: true,
        // comments: true,
        user: true,
        squad_ids: true,
        city: true,
        country: true,
        distance: true,
        duration: true,
        price: true,
      },
    });
    return post;
  }
}
