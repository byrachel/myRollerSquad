import {
  CreatePostInterface,
  PostInterface,
} from "../../../core/entities/PostInterface";
import { PostRepositoryInterface } from "../../../core/repositories/PostRepositoryInterface";
import prisma from "../../prisma/db/client";
import { Prisma } from "@prisma/client";

export class PostRepository implements PostRepositoryInterface {
  async getPosts(cursor: number, limit: number): Promise<PostInterface[]> {
    try {
      const cursorObj = cursor === 0 ? undefined : { id: cursor };
      const posts = await prisma.post.findMany({
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
        },
      });
      return posts;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("Prisma Code Error = ", e);
        throw new Error("Les données ne cont pas accessibles pour le moment.");
      } else {
        throw new Error("Les données ne cont pas accessibles pour le moment.");
      }
    }
  }

  async createPost(post: CreatePostInterface): Promise<PostInterface | null> {
    // let country = "France";
    // if (post.location) {
    //   const geocoding = await fetch(
    //     `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${post.location.latitude}&lon=${post.location.longitude}`
    //   );
    //   const json = await geocoding.json();
    //   country = json.address.country;
    // }

    console.log("POST REPOSITORY", post);

    try {
      const newPost = await prisma.post.create({
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
          style_id: post.style_id,
          link: post.link,
          distance: post.distance,
          duration: post.duration,
        },
      });
      return newPost;
    } catch (err) {
      console.log("NEW POST ERR", err);
      return null;
    }
  }

  async getPost(id: number): Promise<PostInterface | null> {
    const post = await prisma.post.findUnique({
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
      },
    });
    return post;
  }
}
