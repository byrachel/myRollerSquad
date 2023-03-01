import { CreatePostInterface } from "server/core/entities/PostInterface";
import { Post } from "../../../core/entities/Post";
import { PostRepositoryInterface } from "../../../core/repositories/PostRepositoryInterface";
import prisma from "../../prisma/db/client";

export class PostRepository implements PostRepositoryInterface {
  async getPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
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
        likes: true,
        // comments: true,
        user: true,
        squad_ids: true,
        city: true,
        country: true,
      },
    });
    return posts;
  }

  async createPost(post: CreatePostInterface): Promise<any> {
    let country = "France";

    if (post.location) {
      const geocoding = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${post.location.latitude}&lon=${post.location.longitude}`
      );
      const json = await geocoding.json();
      country = json.address.country;
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        hashtags: post.hashtags,
        created_at: new Date().toISOString(),
        user_id: post.user_id,
        category_id: post.category_id,
        country,
        pictures: post.pictures,
        squad_ids: post.squad_ids,
        // city,
        style_id: post.style_id,
        link: post.link,
        distance: post.distance,
        duration: post.duration,
      },
    });
    return newPost;
  }
}
