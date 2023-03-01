import { Post } from "../../../core/entities/Post";
import { PostRepositoryInterface } from "../../../core/repositories/PostRepositoryInterface";
import prisma from "../../prisma/db/client";

export class PostsRepository implements PostRepositoryInterface {
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
}
